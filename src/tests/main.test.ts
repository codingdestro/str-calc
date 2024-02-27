import stringCalc from "../main";
import { test, expect } from "bun:test";
test("adds 1+3 to equal 3", () => expect(stringCalc("1+2")).toBe(3));
test("subtract 2-3 to equal 1", () => expect(stringCalc("3-2")).toBe(1));
test("multiplication 2x3 to equal 6", () => expect(stringCalc("2x3")).toBe(6));
test("division 6/3 to equal 2", () => expect(stringCalc("6/3")).toBe(2));
test("mix 100-10/2x0 to equal 100", () =>
  expect(stringCalc("100-10/2x0")).toBe(100));
test("with parentheses (100-10)/2x0 to equal 0", () => {
  expect(stringCalc("(100-10)/2x0")).toBe(0);
});
test("with negative values -10+5 to equal -5", () => {
  expect(stringCalc("-10+5")).toBe(-5);
});

test("calculating long equation -3+5x6/2+7x5+9/10", () => {
  expect(stringCalc("-3+5x6/2+7x5+9/10")).toBe(47.9);
});
