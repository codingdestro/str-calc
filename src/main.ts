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
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    case '^':
      if (a < 0 && !Number.isInteger(b)) {
        throw new Error('Invalid power operation: negative non-integer exponent');
      }
      return Math.pow(a, b);
    default:
      throw new Error(`Unknown operator: ${op}`);
  }
}

export function stringCalc(expression: string): number {
  if (!expression || expression.trim() === '') {
    throw new Error('Empty expression');
  }

  const normalized = expression.replace(/\s+/g, '');
  
  // Validate brackets and handle empty brackets
  let bracketCount = 0;
  for (let i = 0; i < normalized.length; i++) {
    if (normalized[i] === '(') {
      bracketCount++;
      if (normalized[i + 1] === ')') {
        throw new Error('Invalid expression: Calculation error: Empty expression inside brackets');
      }
    }
    if (normalized[i] === ')') bracketCount--;
    if (bracketCount < 0) {
      throw new Error('Invalid expression: Invalid bracket structure: closing bracket without opening bracket');
    }
  }
  if (bracketCount > 0) {
    throw new Error('Invalid expression: Invalid bracket structure: unclosed opening bracket');
  }

  const tokens = normalized.match(/\d*\.?\d+|[+\-*/^()]/g) || [];
  const values: number[] = [];
  const ops: string[] = [];

  const execute = () => {
    const op = ops.pop()!;
    if (op === 'u-') {
      const a = values.pop();
      if (a === undefined) {
        throw new Error('Invalid expression: Calculation error: Invalid operation: missing operands');
      }
      values.push(-a);
      return;
    }
    const b = values.pop();
    const a = values.pop();
    if (a === undefined || b === undefined) {
      throw new Error('Invalid expression: Calculation error: Invalid operation: missing operands');
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
      if (token === '-' && (i === 0 || tokens[i - 1] === '(' || PRECEDENCE[tokens[i - 1]])) {
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

  return values[0] ?? 0;
}

export default stringCalc;
