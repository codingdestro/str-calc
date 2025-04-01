import stringCalc from "../main";
import { test, expect } from "bun:test";

test("adds 1+2 to equal 3", () => expect(stringCalc("1+2")).toBe(3));
test("subtracts 3-2 to equal 1", () => expect(stringCalc("3-2")).toBe(1));
test("multiplies 2*3 to equal 6", () => expect(stringCalc("2*t s3")).toBe(6));
test("divides 6/3 to equal 2", () => expect(stringCalc("6/3")).toBe(2));
test("evaluates complex expression 100-10/2x0 to equal 100", () =>
  expect(stringCalc("100-10/2*0")).toBe(100));
test("evaluates expression with parentheses (100-10)/2x0 to equal 0", () => {
  expect(stringCalc("(100-10)/2*0")).toBe(0);
});
test("evaluates expression with negative values -10+5 to equal -5", () => {
  expect(stringCalc("-10+5")).toBe(-5);
});

test("evaluates complex expression -3+5*6/2+7*5+9/10 to equal 47.9", () => {
  expect(stringCalc("-3+5*6/2+7*5+9/10")).toBe(47.9);
});
test("evaluates expression with exponentiation 2^3+5x3-1 to equal 22", () => {
  expect(stringCalc("2^3+5*3-1")).toBe(22);
});
