import { describe, expect, it } from 'vitest';
import { HttpError, ValidationError } from './errors.js';

describe('/util/errors', () => {
	describe('HttpError', () => {
		it('should have statusCode, message and data', () => {
			const expectedValues = {
				statusCode: 404,
				message: 'Not found',
				data: { foo: 'bar' },
			};
			const error = new HttpError(...Object.values(expectedValues));
			expect(error).toEqual(expectedValues);
		});

		it('should contain undefined as data if no data is provided', () => {
			const expectedValues = {
				statusCode: 404,
				message: 'Not found',
			};
			const error = new HttpError(...Object.values(expectedValues));
			expect(error).toEqual(expectedValues);
			expect(error.data).toBeUndefined();
		});
	});

	describe('ValidationError', () => {
		it('should have message', () => {
			const expectedValues = {
				message: 'Not found',
			};
			const error = new ValidationError(expectedValues.message);
			expect(error).toEqual(expectedValues);
		});
	});
});