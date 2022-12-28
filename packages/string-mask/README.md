# @pedrobslisboa/string-mask

A light weight string mask library for JavaScript.

## Badges

![](https://badgen.net/bundlephobia/minzip/@pedrobslisboa/js-string-mask?scale=1.3)
![](https://badgen.net/npm/v/@pedrobslisboa/js-string-mask?scale=1.3)

/npm/v/express

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Tokens](#tokens)
  - [Recursive group](#recursive-group)
- [Api](#api)
  - [Options](#options)
- [Examples](#examples)
  - [Phone mask](#phone-mask)
  - [CPF mask](#cpf-mask)
  - [Price mask](#price-mask)
  - [Date mask](#date-mask)
  - [Credit card mask](#credit-card-mask)
- [License](#license)

## Installation

```bash
npm install @pedrobslisboa/string-mask

# or

yarn add @pedrobslisboa/string-mask
```

## Usage

```js
import StringMask from '@pedrobslisboa/string-mask';

const phoneMaskedValues = new StringMask({mask: '+55 (00) 00000-0000');
phoneMaskedValues.apply('11999999999');

console.log(phoneMaskedValues.maskedValue); // +55 (11) 99999-9999
console.log(phoneMaskedValues.unmaskedValue); // 11999999999

// You can also pass a string with the mask
phoneMaskedValues.apply('+55 (11) 99999-9999');

console.log(phoneMaskedValues.maskedValue); // +55 (11) 99999-9999
console.log(phoneMaskedValues.unmaskedValue); // 11999999999
```

## Tokens

| Token | Description           |
| ----- | --------------------- |
| `0`   | Int                   |
| `A`   | Letter                |
| `S`   | Letter or Int         |
| `*`   | Any char              |
| `{`   | Start escape group    |
| `}`   | End escape group      |
| `[`   | Start recursive group |
| `]`   | End recursive group   |
| `$`   | Escape next char      |

### Recursive group

Use recursive groups to repeat a group of tokens; use this pattern at the end of the mask. Having a recursive group in the middle of the mask will result in a misbehavior.

> Maybe in future versions this will be able to be used in the middle of the mask.

```js
import StringMask from '@pedrobslisboa/string-mask';

const priceMask = new StringMask({ mask: '[.000],00', reverse: true });

// The mask will be applied from right to left
// the recursive group will be applied until the end of the string
// So, the result will be 1.234.567,89.
// Mapped to mask:      [   1][.234][.567],89
//                      [.000][.000][.000],00
priceMask.apply('123456789');

console.log(maskedPrice.maskedValue); // 1.234.567,89
```

## Api

```typescript
type MaskedValue = {
  maskedValue: string;
  unmaskedValue: string;
};

interface IStringMask {
  // The masked value
  readonly maskedValue: string;
  // The unmasked value
  readonly unmaskedValue: string;

  // The options used to create the mask
  readonly options: Options;

  // Apply the mask to a string
  apply(
    value: string,
    options?: {
      onProcessFixedChar?: () => void;
      onProcessInputChar?: () => void;
    },
  ): MaskedValue;

  // Change the options of the mask
  updateOptions(options: Options): MaskedValue;
}
```

### Constructor

```typescript
constructor(options?: Options);
```

| Option    | Description                     | Default |
| --------- | ------------------------------- | ------- |
| `mask`    | The mask to be applied          | -       |
| `reverse` | Apply the mask in reverse order | `false` |

## Examples

### Phone mask

```js
import StringMask from '@pedrobslisboa/string-mask';

const phoneMaskedValues = new StringMask({ mask: '+55 (00) 00000-0000' });
phoneMaskedValues.apply('11999999999');

console.log(phoneMaskedValues.maskedValue); // +55 (11) 99999-9999
```

### CPF mask

```js
import StringMask from '@pedrobslisboa/string-mask';

const cpfMaskedValues = new StringMask({ mask: '000.000.000-00' });
cpfMaskedValues.apply('12345678909');

console.log(cpfMaskedValues.maskedValue); // 123.456.789-09
```

### Price mask

```js
import StringMask from '@pedrobslisboa/string-mask';

const priceMask = new StringMask({ mask: '[.000],00', reverse: true });
priceMask.apply('123456789');

console.log(priceMask.maskedValue); // 1.234.567,89
```

### Date mask

```js
import StringMask from '@pedrobslisboa/string-mask';

const dateMask = new StringMask({ mask: '00/00/0000' });
dateMask.apply('01012021');

console.log(dateMask.maskedValue); // 01/01/2021
```

### Credit card mask

```js
import StringMask from '@pedrobslisboa/string-mask';

const creditCardMask = new StringMask({ mask: '0000 0000 0000 0000' });
creditCardMask.apply('1234567890123456');

console.log(creditCardMask.maskedValue); // 1234 5678 9012 3456
```

## License

MIT License
