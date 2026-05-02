import { CalculatorError } from './lib/errors.js';

export { CalculatorError, type ErrorCode } from './lib/errors.js';

type Operator = '+' | '-' | '*' | '/' | '^';

const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
  'u-': 4
};

function applyOp(op: Operator, b: number, a: number): number {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) throw new CalculatorError('MATH_ERROR', 'Division by zero');
      return a / b;
    case '^':
      if (a < 0 && !Number.isInteger(b)) {
        throw new CalculatorError('MATH_ERROR', 'Invalid power operation: negative non-integer exponent');
      }
      return Math.pow(a, b);
    default:
      throw new CalculatorError('SYNTAX_ERROR', `Unknown operator: ${op}`);
  }
}

export function stringCalc(expression: string): number {
  if (!expression || expression.trim() === '') {
    throw new CalculatorError('EMPTY_EXPRESSION', 'Empty expression');
  }

  const normalized = expression.replace(/\s+/g, '');
  
  // Validate invalid characters
  const invalidCharMatch = normalized.match(/[^0-9+\-*/^().]/);
  if (invalidCharMatch) {
    throw new CalculatorError('INVALID_CHAR', `Invalid character detected: '${invalidCharMatch[0]}'`);
  }

  // Validate brackets
  let bracketCount = 0;
  for (let i = 0; i < normalized.length; i++) {
    if (normalized[i] === '(') {
      bracketCount++;
      if (normalized[i + 1] === ')') {
        throw new CalculatorError('SYNTAX_ERROR', 'Empty expression inside brackets');
      }
    }
    if (normalized[i] === ')') bracketCount--;
    if (bracketCount < 0) {
      throw new CalculatorError('BRACKET_MISMATCH', 'Closing bracket without opening bracket');
    }
  }
  if (bracketCount > 0) {
    throw new CalculatorError('BRACKET_MISMATCH', 'Unclosed opening bracket');
  }

  // Detect consecutive operators (excluding unary minus)
  if (/[+\-*/^]{2,}/.test(normalized.replace(/[+\-*/^]-/g, 'op-'))) {
     // This is a bit simplified, but checks for things like ++, +*, etc.
     // normalized.replace(/[+\-*/^]-/g, 'op-') handles things like 5*-3 by replacing them with 5op-3
     // which won't match {2,}
     if (/[+\-*/^]{2,}/.test(normalized.replace(/[+\-*/^]-/g, 'op-'))) {
       throw new CalculatorError('SYNTAX_ERROR', 'Consecutive operators detected');
     }
  }

  const tokens = normalized.match(/\d*\.?\d+|[+\-*/^()]/g) || [];
  const values: number[] = [];
  const ops: string[] = [];

  const execute = () => {
    const op = ops.pop()!;
    if (op === 'u-') {
      const a = values.pop();
      if (a === undefined) {
        throw new CalculatorError('MISSING_OPERANDS', 'Missing operand for unary minus');
      }
      values.push(-a);
      return;
    }
    const b = values.pop();
    const a = values.pop();
    if (a === undefined || b === undefined) {
      throw new CalculatorError('MISSING_OPERANDS', 'Invalid operation: missing operands');
    }
    values.push(applyOp(op as Operator, b, a));
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (/^\d/.test(token) || (token === '.' && tokens[i+1] && /^\d/.test(tokens[i+1]))) {
      values.push(parseFloat(token));
    } else if (token === '(') {
      ops.push(token);
    } else if (token === ')') {
      while (ops.length > 0 && ops[ops.length - 1] !== '(') {
        execute();
      }
      ops.pop(); // Pop '('
    } else if (PRECEDENCE[token]) {
      // Check for unary minus
      if (token === '-' && (i === 0 || tokens[i - 1] === '(' || (PRECEDENCE[tokens[i - 1]] && tokens[i-1] !== 'u-'))) {
        ops.push('u-');
      } else {
        const currentPrec = PRECEDENCE[token];
        while (
          ops.length > 0 &&
          ops[ops.length - 1] !== '(' &&
          PRECEDENCE[ops[ops.length - 1]] >= currentPrec
        ) {
          execute();
        }
        ops.push(token);
      }
    }
  }

  while (ops.length > 0) {
    execute();
  }

  if (values.length !== 1) {
    throw new CalculatorError('SYNTAX_ERROR', 'Invalid expression format');
  }

  return values[0];
}

export default stringCalc;
