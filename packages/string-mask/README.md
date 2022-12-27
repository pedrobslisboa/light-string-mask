# @mask/string

A light weight string mask library for JavaScript.

## Badges

![](https://badgen.net/bundlephobia/minzip/@pedrobslisboa/js-string-mask?scale=1.3)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Tokens](#tokens)
  - [Recursive group](#recursive-group)
- [Api](#api)
- [License](#license)

## Installation

```bash
npm install @mask/string

# or

yarn add @mask/string
```

## Usage

```js
import StringMask from '@mask/string';

const phoneMaskedValues = new StringMask('+55 (00) 00000-0000');

const maskedPhone = phoneMaskedValues.apply('11999999999');

console.log(maskedPhone.value); // +55 (11) 99999-9999
console.log(maskedPhone.unmaskedValue); // 11999999999

// You can also pass a string with the mask
const maskedPhone = phoneMaskedValues.apply('+55 (11) 99999-9999');

console.log(maskedPhone.value); // +55 (11) 99999-9999
console.log(maskedPhone.unmaskedValue); // 11999999999
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
import StringMask from '@mask/string';

const priceMask = new StringMask('[.000],00', { reverse: true });

// The mask will be applied from right to left
// the recursive group will be applied until the end of the string
// So, the result will be 1.234.567,89.
// Mapped to mask:         [1][.234][.567],89
//                     [000.0][.000][.000],00
const maskedPrice = priceMask.apply('123456789');

console.log(maskedPrice); // 1.234.567,89
```

## Api

- StringMask
  - `constructor(mask: string, options?: MaskOptions)`
  - `apply(value: string): MaskedValue`
  - `unmasked(value: string): string`
  - `value(value: string): string`
  - `changeOptions(options: MaskOptions): void`

| Method          | Description                    |
| --------------- | ------------------------------ |
| `apply`         | Apply the mask to a string     |
| `unmasked`      | The unmasked value             |
| `value`         | The masked value               |
| `changeOptions` | Change the options of the mask |

### Options

| Option    | Description                     | Default |
| --------- | ------------------------------- | ------- |
| `reverse` | Apply the mask in reverse order | `false` |

## Examples

### Phone mask

```js
import StringMask from '@mask/string';

const phoneMaskedValues = new StringMask('+55 (00) 00000-0000');
const maskedPhone = phoneMaskedValues.apply('11999999999');

console.log(maskedPhone.value); // +55 (11) 99999-9999
```

### CPF mask

```js
import StringMask from '@mask/string';

const cpfMaskedValues = new StringMask('000.000.000-00');
const maskedCpf = cpfMaskedValues.apply('12345678909');

console.log(maskedCpf.value); // 123.456.789-09
```

### Price mask

```js
import StringMask from '@mask/string';

const priceMask = new StringMask('[.000],00', { reverse: true });
const maskedPrice = priceMask.apply('123456789');

console.log(maskedPrice); // 1.234.567,89
```

### Date mask

```js
import StringMask from '@mask/string';

const dateMask = new StringMask('00/00/0000');
const maskedDate = dateMask.apply('01012021');

console.log(maskedDate); // 01/01/2021
```

### Credit card mask

```js
import StringMask from '@mask/string';

const creditCardMask = new StringMask('0000 0000 0000 0000');
const maskedCreditCard = creditCardMask.apply('1234567890123456');

console.log(maskedCreditCard); // 1234 5678 9012 3456
```

## License

MIT License
