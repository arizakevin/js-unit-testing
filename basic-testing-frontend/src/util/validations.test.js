import { it, expect, describe } from "vitest";
import { validateStringNotEmpty, validateNumber } from "./validation";


describe("validateStringNotEmpty()", () => {
	it("should not throw an error if a valid string is provided", () => {
		const value = "valid";

		const resultFn = () => validateStringNotEmpty(value);

		expect(resultFn).not.toThrow();
	});
	
	it("should throw an error if an empty string is provided", () => {
		const value = "";
		const expectedError = /must not be empty./;
		
		const resultFn = () => validateStringNotEmpty(value);
		
		expect(resultFn).toThrow(expectedError);
	});
	
	it("should throw an error if a string with only whitespace is provided", () => {
		const value = " ";
		const expectedError = /must not be empty./;
		
		const resultFn = () => validateStringNotEmpty(value);
		
		expect(resultFn).toThrow(expectedError);
	});
	
	it("should throw an error if a non-string is provided", () => {
		const value = 1;
		const value2 = {};
		const value3 = [];

		const expectedError = /must not be empty./;
		
		const resultFn = () => validateStringNotEmpty(value);
		const resultFn2 = () => validateStringNotEmpty(value2);
		const resultFn3 = () => validateStringNotEmpty(value3);
		
		expect(resultFn).toThrow(expectedError);
		expect(resultFn2).toThrow(expectedError);
		expect(resultFn3).toThrow(expectedError);
	});
});

// validateNumber tests:

describe("validateStringNotEmpty()", () => {
	it("should not throw an error if a valid number is provided", () => {
		const value = 1;
	
		const resultFn = () => validateNumber(value);
	
		expect(resultFn).not.toThrow();
	});
	
	it("should throw an error if a string number is provided", () => {
		const value = "1";
		const expectedError = /Invalid number input./;
		
		const resultFn = () => validateNumber(value);
		
		expect(resultFn).toThrow(expectedError);
	});
	
	it("should throw an error if a non-number is provided", () => {
		const stringValue = "invalid";
		const objValue = {};
		const arrayValue = [];
		const boolValue = true;
	
		const expectedError = /Invalid number input./;
		
		const resultFn = () => validateNumber(stringValue);
		const resultFn2 = () => validateNumber(objValue);
		const resultFn3 = () => validateNumber(arrayValue);
		const resultFn4 = () => validateNumber(boolValue);
		
		expect(resultFn).toThrow(expectedError);
		expect(resultFn2).toThrow(expectedError);
		expect(resultFn3).toThrow(expectedError);
		expect(resultFn4).toThrow(expectedError);
	});
	
	it("should throw an error if NaN is provided", () => {
		const value = NaN;
		const expectedError = /Invalid number input./;
		
		const resultFn = () => validateNumber(value);
		
		expect(resultFn).toThrow(expectedError);
	});
});
