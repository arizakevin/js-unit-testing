import { describe, it, expect, beforeEach } from "vitest";
import { extractPostData, savePost } from "./posts.js";

const testForm = new Map();
/* 
    Map is a built-in JavaScript object that can be used as a key-value store
    Simulates a form with title and content
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
*/

describe('posts', () => {
	describe('extractPostData', () => {
		beforeEach(() => {
			testForm.set("title", "foo");
			testForm.set("content", "bar");
		});

		it('should throw an error if title is empty', () => {
			testForm.set('title', '');

			const testFn = () => extractPostData(testForm);

			expect(testFn).toThrow('A title must be provided.');
		});

		it('should throw an error if content is empty', () => {
			testForm.set('content', '');

			const testFn = () => extractPostData(testForm);

			expect(testFn).toThrow('Content must not be empty!');
		});

		it('should return an object with title and content', () => {
			const result = extractPostData(testForm);

			expect(result).toEqual({ title: 'foo', content: 'bar' });
		});
	});
});