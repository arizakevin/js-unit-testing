import { it, expect } from "vitest";
import { add } from "./math";

it("should summarize all number values in an array", () => {
	// Arrange
	const numbers = [1, 2];
	const expectedResult = numbers.reduce((a, b) => a + b, 0);

	// Act
	const result = add(numbers);

	// Assert
  expect(result).toBe(expectedResult);
});

it("should yield 0 for an empty array", () => {
	const numbers = [];
	const expectedResult = 0;

	const result = add(numbers);

	expect(result).toBe(expectedResult);
});

it("should yield NaN if at least one invalid number is provided", () => {
	const numbers = [1, 2, "invalid"];

	const result = add(numbers);

	expect(result).toBeNaN();
});

it("should yield a correct sum if an array of numeric strings is provided", () => {
	const numbers = ["1", "2"];
	const expectedResult = numbers.reduce((a, b) => +a + +b, 0);

	const result = add(numbers);

	expect(result).toBe(expectedResult);
});

it("should yield a correct sum if an array of mixed strings and numbers is provided", () => {
	const numbers = ["1", 2];
	const expectedResult = numbers.reduce((a, b) => +a + +b, 0);

	const result = add(numbers);

	expect(result).toBe(expectedResult);
});

it("should yield a correct sum if negative numbers are provided", () => {
	const numbers = [-1, -2];
	const expectedResult = numbers.reduce((a, b) => a + b, 0);

	const result = add(numbers);

	expect(result).toBe(expectedResult);
});

it("should throw an error if a non-array is provided", () => {
	const numbers = 1;
	const resultFn = () => add(numbers);
	expect(resultFn).toThrow();
});

it("should throw an error if no argument is provided", () => {
	const resultFn = () => add();
	expect(resultFn).toThrow(/is not iterable/);
});

it("should throw an error if provided with multiple arguments", () => {
	const resultFn = () => add(1, 2);
	expect(resultFn).toThrow(/is not iterable/);
});
