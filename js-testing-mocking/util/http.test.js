import { describe, expect, it, vi } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

const testResponseData = { testKey: "testValue"};
const testFetch = vi.fn((url, options) => {
	return new Promise((resolve, reject) => {
		if (typeof options.body !== "string") {
			return reject(new Error("options.body is not a string"));
		}
		const testResponse = {
			ok: true,
			json: () => new Promise((resolve, reject) => resolve(testResponseData)),
		};
		resolve(testResponse);
	});
});

vi.stubGlobal("fetch", testFetch);

describe("/util/http", () => {
	describe("sendDataRequest", () => {
		it("should return response data", async () => {
			const testData = { foo: "bar" };
			const responseData = await sendDataRequest(testData);
			expect(responseData).toEqual(testResponseData);
		});

		it("should call fetch with correct url", async () => {
			const testData = { foo: "bar" };
			await sendDataRequest(testData);
			expect(testFetch).toHaveBeenCalledWith("https://dummy-site.dev/posts", {
				method: "POST",
				headers: {
						"Content-Type": "application/json",
				},
				body: JSON.stringify(testData),
			});
		});

		it("should throw HttpError if response is not ok", async () => {
			const testData = { foo: "bar" };
			testFetch.mockImplementationOnce(() => {
				return new Promise((resolve, reject) => {
					const testResponse = {
						ok: false,
						status: 500,
						json: () => new Promise((resolve, reject) => resolve(testResponseData)),
					};
					resolve(testResponse);
				});
			});
			const testFn = () => sendDataRequest(testData);
			try {
				await testFn();
			} catch (error) {
				expect(error).toBeInstanceOf(HttpError);
			}
		});

		it("should throw HttpError with correct status code", async () => {
			const testData = { foo: "bar" };
			const expectedStatusCode = 500;
			testFetch.mockImplementationOnce(() => {
				return new Promise((resolve, reject) => {
					const testResponse = {
						ok: false,
						status: 500,
						json: () => new Promise((resolve, reject) => resolve(testResponseData)),
					};
					resolve(testResponse);
				});
			});
			const testFn = () => sendDataRequest(testData);
			try {
				await testFn();
			} catch (error) {
				expect(error.statusCode).toBe(expectedStatusCode);
			}
		});

		it("should throw HttpError with correct message", async () => {
			const testData = { foo: "bar" };
			const expectedMessage = "Sending the request failed.";
			testFetch.mockImplementationOnce(() => {
				return new Promise((resolve, reject) => {
					const testResponse = {
						ok: false,
						status: 500,
						json: () => new Promise((resolve, reject) => resolve(testResponseData)),
					};
					resolve(testResponse);
				});
			});
			const testFn = () => sendDataRequest(testData);
			try {
				await testFn();
			} catch (error) {
				expect(error.message).toBe(expectedMessage);
			}
		});

		it('should convert the provided data to JSON before sending the request', async () => {
			const testData = { foo: 'bar' };
			await sendDataRequest(testData);
			expect(testFetch).toHaveBeenCalledWith('https://dummy-site.dev/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(testData),
			});

			try {
				await sendDataRequest(testData);
			} catch (error) {
				expect(error).toBeInstanceOf(HttpError);
				expect(error.statusCode).toBe(500);
				expect(error.message).toBe("options.body is not a string");
			}
		});
	});
});