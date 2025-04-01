import List, { Node } from "./lib/list.js";

type ValueType = string | number;
type Operator = '+' | '-' | '*' | '/' | '^';

interface CalculatorState {
  list: List;
  fastStack: Node[];
  slowStack: Node[];
  powerStack: Node[];
  value: number;
}

class Calculator {
  private readonly state: CalculatorState;

  constructor(expression: string) {
    this.state = {
      list: new List(),
      fastStack: [],
      slowStack: [],
      powerStack: [],
      value: 0
    };
    this.processExpression(expression);
  }

  private isOperator(char: string): char is Operator {
    return ['+', '-', '*', '/', '^'].includes(char);
  }

  private addValueToNode(prev: ValueType, char: string): boolean {
    if (!this.isOperator(char)) return false;

    const prevValue = parseFloat(prev.toString());
    if (isNaN(prevValue)) return false;

    this.state.list.addNode(prevValue);
    const operatorNode = this.state.list.addNode(char);

    if (char === '^') {
      this.state.powerStack.push(operatorNode);
    } else if (char === '+' || char === '-') {
      this.state.slowStack.push(operatorNode);
    } else {
      this.state.fastStack.push(operatorNode);
    }

    return true;
  }

  private processExpression(expression: string): void {
    let currentValue = '';
    
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === ' ' || char === '') continue;

      if (this.addValueToNode(currentValue, char)) {
        currentValue = '';
      } else {
        currentValue += char;
        if (i === expression.length - 1) {
          const finalValue = parseFloat(currentValue);
          if (!isNaN(finalValue)) {
            this.state.list.addNode(finalValue);
          }
        }
      }
    }
  }

  private performOperation(node: Node): number {
    if (!node.prev || !node.next) {
      throw new Error('Invalid operation: missing operands');
    }

    const left = node.prev.val as number;
    const right = node.next.val as number;
    const operator = node.val as Operator;

    switch (operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': 
        if (right === 0) throw new Error('Division by zero');
        return left / right;
      case '^':
        if (right < 0 && !Number.isInteger(right)) {
          throw new Error('Invalid power operation: negative non-integer exponent');
        }
        return Math.pow(left, right);
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  private updateList(result: number, node: Node): void {
    const newNode = new Node(result);
    
    if (node.next?.next) {
      node.next.next.prev = newNode;
      newNode.next = node.next.next;
    }
    
    if (node.prev?.prev) {
      node.prev.prev.next = newNode;
      newNode.prev = node.prev.prev;
    }
  }

  public calculate(): number {
    // Process operators in order of precedence: power (^) -> multiplication/division (x,/) -> addition/subtraction (+,-)
    const operators = [...this.state.powerStack, ...this.state.fastStack, ...this.state.slowStack];
    
    while (operators.length > 0) {
      const node = operators.shift();
      if (!node) continue;

      try {
        const result = this.performOperation(node);
        this.state.value = result;
        this.updateList(result, node);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Calculation error: ${errorMessage}`);
      }
    }

    return this.state.value;
  }
}

function validateBrackets(expression: string): void {
  let bracketCount = 0;
  
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === '(') bracketCount++;
    if (char === ')') bracketCount--;
    
    if (bracketCount < 0) {
      throw new Error('Invalid bracket structure: closing bracket without opening bracket');
    }
  }
  
  if (bracketCount > 0) {
    throw new Error('Invalid bracket structure: unclosed opening bracket');
  }
}

function parseExpression(expression: string, startIndex = 0): [number, number] {
  let currentIndex = startIndex;
  let processedExpression = '';
  
  while (currentIndex < expression.length && expression[currentIndex] !== ')') {
    const char = expression[currentIndex];
    
    if (char === '(') {
      const [newIndex, subResult] = parseExpression(expression, currentIndex + 1);
      currentIndex = newIndex;
      processedExpression += subResult;
    } else if (char !== ' ') {
      processedExpression += char;
    }
    
    currentIndex++;
  }

  if (processedExpression === '') {
    throw new Error('Empty expression inside brackets');
  }

  const calculator = new Calculator(processedExpression);
  return [currentIndex, calculator.calculate()];
}

export function stringCalc(expression: string): number {
  if (!expression) {
    throw new Error('Empty expression');
  }

  // Remove all whitespace
  expression = expression.replace(/\s+/g, '');

  // Validate bracket structure
  validateBrackets(expression);

  // Handle negative numbers at the start
  const normalizedExpression = expression[0] === '-' ? `0${expression}` : expression;
  
  try {
    const [, result] = parseExpression(normalizedExpression);
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Invalid expression: ${errorMessage}`);
  }
}

export default stringCalc;
