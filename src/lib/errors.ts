export type ErrorCode = 
  | 'EMPTY_EXPRESSION' 
  | 'INVALID_CHAR' 
  | 'SYNTAX_ERROR' 
  | 'BRACKET_MISMATCH' 
  | 'MATH_ERROR' 
  | 'MISSING_OPERANDS';

export class CalculatorError extends Error {
  public code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'CalculatorError';
    
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, CalculatorError.prototype);
  }
}
