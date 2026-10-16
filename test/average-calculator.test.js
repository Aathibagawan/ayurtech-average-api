const AverageCalculator = require("../src/average-calculator");

describe("AverageCalculator", () => {
  let calculator;

  beforeEach(() => {
    calculator = new AverageCalculator();
  });

  test("returns the first number as the average", () => {
    expect(calculator.add(10)).toBe(10);
  });

  test("calculates the running average for multiple numbers", () => {
    expect(calculator.add(10)).toBe(10);
    expect(calculator.add(20)).toBe(15);
    expect(calculator.add(30)).toBe(20);
  });

  test("supports decimals", () => {
    calculator.add(10.5);
    expect(calculator.add(20.5)).toBe(15.5);
  });

  test("supports negative numbers", () => {
    calculator.add(-10);
    expect(calculator.add(20)).toBe(5);
  });

  test("tracks the number of values", () => {
    calculator.add(2);
    calculator.add(4);
    expect(calculator.getCount()).toBe(2);
  });

  test("can reset its state", () => {
    calculator.add(10);
    calculator.reset();
    expect(calculator.getCount()).toBe(0);
    expect(calculator.add(50)).toBe(50);
  });

  test("rejects non-finite values", () => {
    expect(() => calculator.add(Infinity)).toThrow(TypeError);
    expect(() => calculator.add(NaN)).toThrow(TypeError);
  });
});
