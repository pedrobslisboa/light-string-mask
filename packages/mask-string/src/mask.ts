import { InputDef, FixedDef, Def } from "./charDefs";
import { reverseStr } from "./utils/reverseString";

const tokens: {
  [key: string]: {
    type: string;
    pattern: RegExp | null;
  };
} = {
  "0": {
    type: "Number",
    pattern: /\d/,
  },
  A: {
    type: "Letter",
    pattern: /[a-zA-Z]/,
  },
  S: {
    type: "Alphanumeric",
    pattern: /[a-zA-Z0-9]/,
  },
  "*": {
    type: "Any",
    pattern: null,
  },
  "[": {
    type: "InitRecursive",
    pattern: null,
  },
  "]": {
    type: "EndRecursive",
    pattern: null,
  },
  "{": {
    type: "InitOptional",
    pattern: null,
  },
  "}": {
    type: "EndOptional",
    pattern: null,
  },
  $: {
    type: "Escape",
    pattern: null,
  },
};

type MaskedValue = {
  masked: string;
  unmasked: string;
};

interface IStringMask {
  options: Options;

  apply(
    value: string,
    options?: {
      onProcessFixedChar?: () => void;
      onProcessInputChar?: () => void;
    }
  ): MaskedValue;
}

type Options = {
  reverse?: boolean;
  mask: string;
};

class StringMask implements IStringMask {
  private processedChars: Array<Def>;
  private _options: Options;

  constructor(options: Options) {
    this._options = options;
    this.processedChars = [];
  }

  private process = (
    strValue: string,
    options: {
      mask: string;
      reverse?: boolean;
      onProcessFixedChar?: (char: string) => void;
      onProcessInputChar?: (char: string, index: number) => void;
    }
  ): Array<Def> => {
    let valuePos = 0;
    const { reverse, mask } = options;
    const processedChars = [];
    let isOptional = false;

    const value = reverse ? reverseStr(strValue) : strValue;
    const maskChars = reverse ? reverseStr(mask).split("") : mask.split("");
    const initRecursiveChar = reverse ? tokens["]"].type : tokens["["].type;
    const endRecursiveChar = reverse ? tokens["["].type : tokens["]"].type;

    for (let i = 0; i < mask.length; i++) {
      if (valuePos >= value.length) {
        break;
      }

      switch (tokens[maskChars[i]]?.type) {
        case "Number":
        case "Alphanumeric":
        case "Letter": {
          if (tokens[maskChars[i]].pattern?.test(value[valuePos])) {
            processedChars.push(new InputDef(value[valuePos]));

            if (options.onProcessInputChar) {
              options.onProcessInputChar(value[valuePos], valuePos);
            }

            valuePos++;
          } else {
            if (isOptional) {
              break;
            }

            for (let j = valuePos; j < value.length; j++) {
              if (tokens[maskChars[i]].pattern?.test(value[j]) === false) {
                if (options.onProcessInputChar) {
                  options.onProcessInputChar(value[valuePos], valuePos);
                }

                valuePos++;
              } else {
                i--;
                break;
              }
            }
          }

          break;
        }
        case "Any": {
          processedChars.push(new InputDef(value[valuePos]));

          if (options.onProcessInputChar) {
            options.onProcessInputChar(value[valuePos], valuePos);
          }

          valuePos++;

          break;
        }
        case "Escape": {
          processedChars.push(new FixedDef(maskChars[i + 1]));

          if (options.onProcessFixedChar) {
            options.onProcessFixedChar(maskChars[i + 1]);
          }

          i++;
          break;
        }
        case initRecursiveChar: {
          const recursiveMask = maskChars.slice(
            i + 1,
            maskChars.indexOf(endRecursiveChar)
          );

          while (valuePos < value.length) {
            const recursiveValue = value.slice(valuePos);

            const recursiveProcessedChars = this.process(recursiveValue, {
              mask: recursiveMask.join(""),
              onProcessInputChar: (char) => {
                if (options.onProcessInputChar) {
                  options.onProcessInputChar(char, valuePos);
                }

                valuePos++;
              },
              onProcessFixedChar: (char) => {
                if (options.onProcessFixedChar) {
                  options.onProcessFixedChar(char);
                }
              },
            });

            processedChars.push(...recursiveProcessedChars);
          }

          break;
        }

        case "InitOptional":
        case "EndOptional": {
          isOptional = !isOptional;

          break;
        }

        default: {
          if (maskChars[i] === value[valuePos]) {
            if (options.onProcessInputChar) {
              options.onProcessInputChar(value[valuePos], valuePos);
            }

            valuePos++;
          }

          if (options.onProcessFixedChar) {
            options.onProcessFixedChar(maskChars[i]);
          }

          processedChars.push(new FixedDef(maskChars[i]));
        }
      }
    }

    return options?.reverse ? processedChars.reverse() : processedChars;
  };

  public apply(
    value: string,
    options?: {
      onProcessFixedChar?: (char: string) => void;
      onProcessInputChar?: (char: string, index: number) => void;
    }
  ): MaskedValue {
    const processedChars = this.process(value, {
      ...this.options,
      ...options,
    });

    this.processedChars = processedChars;

    return {
      masked: processedChars.map((char) => char.masked).join(""),
      unmasked: processedChars.map((char) => char.unmasked).join(""),
    };
  }

  public get value() {
    return this.processedChars.map((char) => char.masked).join("");
  }

  public get unmaskedValue() {
    return this.processedChars.map((char) => char.unmasked).join("");
  }

  public get options() {
    return this._options;
  }

  public updateOptions(options: Partial<Options>) {
    this._options = { ...this._options, ...options };

    const processedChars = this.process(
      this.processedChars.map((char) => char.masked).join(""),
      {
        ...this._options,
      }
    );

    this.processedChars = processedChars;

    return {
      masked: this.value,
      unmasked: this.unmaskedValue,
    };
  }
}

export default StringMask;
