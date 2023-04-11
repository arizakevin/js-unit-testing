import { it, expect, describe } from "vitest";
import { generateResultText } from "./output.js";

describe("generateResultText()", () => {
	it("should generate correct result text for invalid input", () => {
		const result = "invalid";
		const expectedResult = "Invalid input. You must enter valid numbers.";

		const resultText = generateResultText(result);

		expect(resultText).toBe(expectedResult);
	});

	it("should generate correct result text for valid input", () => {
		const result = 1;
		const expectedResult = "Result: 1";

		const resultText = generateResultText(result);

		expect(resultText).toBe(expectedResult);
	});

	it("should generate correct result text for no calculation", () => {
		const result = "no-calc";
		const expectedResult = "";

		const resultText = generateResultText(result);

		expect(resultText).toBe(expectedResult);
	});

	it("should return a string, no matter which input is provided", () => {
		const result = "invalid";
		const result2 = 1;
		const result3 = "no-calc";
		const result4 = {};
		const result5 = [];
		const result6 = true;

		const resultText = generateResultText(result);
		const resultText2 = generateResultText(result2);
		const resultText3 = generateResultText(result3);
		const resultText4 = generateResultText(result4);
		const resultText5 = generateResultText(result5);
		const resultText6 = generateResultText(result6);

		expect(resultText).toBeTypeOf("string");
		expect(resultText2).toBeTypeOf("string");
		expect(resultText3).toBeTypeOf("string");
		expect(resultText4).toBeTypeOf("string");
		expect(resultText5).toBeTypeOf("string");
		expect(resultText6).toBeTypeOf("string");
	});
});
