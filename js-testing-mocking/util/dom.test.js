import fs from "fs";
import path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Window } from "happy-dom";
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
document.write(htmlDocumentContent);
vi.stubGlobal("document", document);

const errorContainerElement = document.getElementById("errors");

describe("/util/dom.js", () => {
	beforeEach(() => {
		errorContainerElement.innerHTML = "";
	});

	describe("showError", () => {
		it('should add an error paragraph to the id="errors" element', () => {
			showError("Error message");

			const errorMessageElement = errorContainerElement.querySelector("p");

			expect(errorMessageElement).not.toBeNull();
		});

		it("should add the error message to the paragraph", () => {
			const errorMessage = "Error message";

			showError(errorMessage);

			const errorMessageElement = errorContainerElement.querySelector("p");

			expect(errorMessageElement.textContent).toBe(errorMessage);
		});

		it("should not contain an error paragraph initially", () => {
			const errorMessageElement = errorContainerElement.querySelector("p");

			expect(errorMessageElement).toBeNull();
		});
	});
});
