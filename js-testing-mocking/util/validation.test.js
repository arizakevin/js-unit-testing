import { describe, expect, it } from 'vitest';
import { validateNotEmpty } from './validation.js';
import { ValidationError } from './errors.js';

describe('/util/validation', () => {
	describe('validateNotEmpty', () => {
		it('should throw ValidationError if text is empty', () => {
			const errorMessage = 'Text is empty';
			const emptyString = '';

			const testFn = () => validateNotEmpty(emptyString, errorMessage);

			expect(testFn).toThrow(ValidationError);
		});

		it('should not throw ValidationError if text is not empty', () => {
			const errorMessage = 'Text is empty';
			const inputText = 'foo';

			const testFn = () => validateNotEmpty(inputText, errorMessage);

			expect(testFn).not.toThrow(ValidationError);
		});

		it('should throw an error if a string of blank spaces is passed', () => {
			const errorMessage = 'Text is empty';
			const inputText = ' ';

			const testFn = () => validateNotEmpty(inputText, errorMessage);

			expect(testFn).toThrow(ValidationError);
		});

		it('should throw an error with the provided message', () => {
			const errorMessage = 'Text is empty';
			const inputText = ' ';

			const testFn = () => validateNotEmpty(inputText, errorMessage);

			expect(testFn).toThrow(errorMessage);
		});
	});
});
