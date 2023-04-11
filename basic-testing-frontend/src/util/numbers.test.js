import { it, expect, describe } from "vitest";
import { transformToNumber, cleanNumbers } from "./numbers";

describe("transformToNumber()", () => {
	it("should transform a string number to a number of type number", () => {
		const value = "1";
		const expectedResult = +value;
		
		const result = transformToNumber(value);
		
		expect(result).toBe(expectedResult);
		expect(result).toBeTypeOf("number");
	});
	
	it("should yield NaN for non-transformable values", () => {
		const stringValue = "invalid";
		const objValue = {};
		const arrayValue = [];
		const boolValue = true;
	
		const result = transformToNumber(stringValue);
		const result2 = transformToNumber(objValue);	
		const result3 = transformToNumber(arrayValue);
		const result4 = transformToNumber(boolValue);
	
		expect(result).toBeNaN();
		expect(result2).toBeNaN();
		expect(result3).toBeNaN();
		expect(result4).toBeNaN();
	});
});

describe("cleanNumbers()", () => {
	it("should return an array of number values if an array of string number values is provided", () => {
		const numbers = ["1", "2"];
		const expectedResult = numbers.map(num => +num);

		const result = cleanNumbers(numbers);

		expect(result).toEqual(expectedResult);
		expect(result[0]).toBeTypeOf("number");
	});

	it("should throw an error if an array with at least one empty string is provided", () => {
		const numbers = ["1", ""];

		const resultFn = () => cleanNumbers(numbers);

		expect(resultFn).toThrow();
	});

	it("should throw an error if an array with at least one non-string value is provided", () => {
		const numbers = ["1", 2];
		const numbers2 = ["1", {}];
		const numbers3 = ["1", []];
		const numbers4 = ["1", true];

		const resultFn = () => cleanNumbers(numbers);
		const resultFn2 = () => cleanNumbers(numbers2);
		const resultFn3 = () => cleanNumbers(numbers3);
		const resultFn4 = () => cleanNumbers(numbers4);

		expect(resultFn).toThrow();
		expect(resultFn2).toThrow();
		expect(resultFn3).toThrow();
		expect(resultFn4).toThrow();
	});
});
