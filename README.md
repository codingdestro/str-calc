
---

# String Calculator

The String Calculator is a JavaScript function designed to evaluate arithmetic expressions represented as strings. It can handle basic arithmetic operations such as addition (+), subtraction (-), multiplication (x), and division (/). The function parses the input string and calculates the result.

## Installation

To use the String Calculator function, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   npm i @codingdestro/str-calc
   ```

2. Import the function:

   ```js
   const stringCalc = require("stringCalc")
   ```

## Usage

To use the String Calculator function, simply call it with a string representing the arithmetic expression you want to evaluate. For example:

```javascript
const result = stringCalc("100-10/2x0+5");
console.log(result); // Output: 105
```

The function will parse the input string and calculate the result according to the standard rules of arithmetic.

## Supported Operations

The String Calculator function supports the following arithmetic operations:

- Addition +
- Subtraction -
- Multiplication x
- Division /
- Parentheses ()

## Examples

Here are some examples of valid input strings and their corresponding results:

- `"100-10/2x0+5"` => `105`
- `"10+20-5"` => `25`
- `"50x2/5"` => `20`
- `"100/2x3"` => `150`
- `"100/(2x3)"` => `20`

## Error Handling

The function does not currently handle invalid input strings or edge cases such as division by zero. Therefore, it's important to ensure that the input string follows the expected format and does not contain any errors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**please subscribe my youtube channel `codingdestro`**