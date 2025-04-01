# String Calculator

A robust JavaScript library for evaluating arithmetic expressions represented as strings. This library provides a simple and efficient way to parse and calculate mathematical expressions with support for basic arithmetic operations.

## Features

- Evaluate arithmetic expressions from strings
- Support for basic arithmetic operations:
  - Addition (+)
  - Subtraction (-)
  - Multiplication (*)
  - Division (/)
  - Parentheses for grouping ()
- Simple and intuitive API
- Lightweight and dependency-free

## Installation

```bash
npm install @codingdestro/str-calc
```

## Quick Start

```javascript
const stringCalc = require("@codingdestro/str-calc");

// Basic arithmetic
console.log(stringCalc("100-10/2*0+5")); // Output: 105
console.log(stringCalc("10+20-5"));      // Output: 25
console.log(stringCalc("50*2/5"));       // Output: 20

// With parentheses
console.log(stringCalc("100/(2*3)"));    // Output: 20
```

## API Reference

### `stringCalc(expression: string): number`

Evaluates a mathematical expression represented as a string.

#### Parameters
- `expression` (string): The arithmetic expression to evaluate

#### Returns
- (number): The calculated result

#### Examples

```javascript
// Basic operations
stringCalc("5 + 3")     // Returns: 8
stringCalc("10 - 4")    // Returns: 6
stringCalc("6 * 2")     // Returns: 12
stringCalc("15 / 3")    // Returns: 5

// Complex expressions
stringCalc("100-10/2*0+5")  // Returns: 105
stringCalc("(10+5)*2")      // Returns: 30
```

## Error Handling

The library includes basic error handling for:
- Invalid expressions
- Division by zero
- Unmatched parentheses
- Invalid operators

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this library helpful, please consider:
- Starring the repository
- Subscribing to my YouTube channel [codingdestro](https://youtube.com/codingdestro)
- Reporting bugs or suggesting features through GitHub issues
