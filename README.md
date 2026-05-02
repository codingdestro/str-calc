# @codingdestro/str-calc

A high-performance, robust string calculator for evaluating arithmetic expressions. Optimized with an $O(N)$ Shunting-yard algorithm variant.

## Features

- **High Performance:** Uses an $O(N)$ two-stack algorithm for efficient single-pass evaluation.
- **Support for All Basic Operators:**
  - Addition (`+`), Subtraction (`-`)
  - Multiplication (`*`), Division (`/`)
  - Exponentiation (`^`)
- **Advanced Parsing:**
  - Full support for parentheses `()` grouping.
  - Robust **unary minus** handling (e.g., `-10`, `5*-3`, `-(1+2)`).
- **Structured Error Handling:** Custom `CalculatorError` with specific error codes for easy debugging.
- **Zero Dependencies:** Lightweight and fast.
- **TypeScript Support:** Fully typed out-of-the-box.

## Installation

```bash
npm install @codingdestro/str-calc
```

## Quick Start

```javascript
import stringCalc from "@codingdestro/str-calc";

// Basic arithmetic (Follows BODMAS/PEMDAS)
console.log(stringCalc("100-10/2*0+5")); // Output: 105

// Exponentiation and negative numbers
console.log(stringCalc("2^3 + 5*-3"));   // Output: -7 (8 - 15)

// Nested parentheses
console.log(stringCalc("((10+5)*2)^2"));  // Output: 900
```

## Error Handling

The library exports a `CalculatorError` class with specific error codes to help you handle failures programmatically.

```javascript
import stringCalc, { CalculatorError } from "@codingdestro/str-calc";

try {
  stringCalc("1 / 0");
} catch (error) {
  if (error instanceof CalculatorError) {
    console.log(error.code);    // "MATH_ERROR"
    console.log(error.message); // "Division by zero"
  }
}
```

### Error Codes

| Code | Description |
| :--- | :--- |
| `EMPTY_EXPRESSION` | The input string is empty or only whitespace. |
| `INVALID_CHAR` | The expression contains unauthorized characters (e.g., letters). |
| `SYNTAX_ERROR` | The expression is malformed (e.g., `1 ++ 2`, empty brackets). |
| `BRACKET_MISMATCH` | Parentheses are not correctly opened or closed. |
| `MATH_ERROR` | Mathematical errors like division by zero or invalid powers. |
| `MISSING_OPERANDS` | An operator is missing its required values (e.g., `1 +`). |

## API Reference

### `stringCalc(expression: string): number`

Evaluates a mathematical expression represented as a string.

- **Parameters:** `expression` (string) - The arithmetic expression to evaluate.
- **Returns:** `number` - The calculated result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

If you find this library helpful, please consider:
- Starring the repository
- Subscribing to my YouTube channel [codingdestro](https://youtube.com/codingdestro)
- Reporting bugs or suggesting features through GitHub issues
