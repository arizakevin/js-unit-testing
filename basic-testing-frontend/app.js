import { calculateResult } from './src/math.js';
import { extractEnteredNumberValues } from './src/parser.js';
import { generateResultText, outputResult } from './src/output.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
  event.preventDefault();
  const numberValues = extractEnteredNumberValues(form);

  let result = calculateResult(numberValues);

  let resultText = generateResultText(result);

  outputResult(resultText);
}

form.addEventListener('submit', formSubmitHandler);
