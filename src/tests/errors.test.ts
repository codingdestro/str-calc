import stringCalc, { CalculatorError } from "../main";
import { test, expect } from "bun:test";

test("throws EMPTY_EXPRESSION for empty string", () => {
  try {
    stringCalc("");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('EMPTY_EXPRESSION');
  }
});

test("throws INVALID_CHAR for letters", () => {
  try {
    stringCalc("1 + a");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('INVALID_CHAR');
  }
});

test("throws BRACKET_MISMATCH for unclosed bracket", () => {
  try {
    stringCalc("(1 + 2");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('BRACKET_MISMATCH');
  }
});

test("throws BRACKET_MISMATCH for extra closing bracket", () => {
  try {
    stringCalc("1 + 2)");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('BRACKET_MISMATCH');
  }
});

test("throws SYNTAX_ERROR for consecutive operators", () => {
  try {
    stringCalc("1 ++ 2");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('SYNTAX_ERROR');
  }
});

test("throws MATH_ERROR for division by zero", () => {
  try {
    stringCalc("1 / 0");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('MATH_ERROR');
  }
});

test("throws MATH_ERROR for invalid power", () => {
  try {
    stringCalc("(-2)^0.5");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('MATH_ERROR');
  }
});

test("throws MISSING_OPERANDS for trailing operator", () => {
  try {
    stringCalc("1 +");
  } catch (e: any) {
    expect(e).toBeInstanceOf(CalculatorError);
    expect(e.code).toBe('MISSING_OPERANDS');
  }
});
