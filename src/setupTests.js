// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Set default API key for tests if not already set
if (!process.env.VITE_OPENAI_API_KEY) {
  process.env.VITE_OPENAI_API_KEY = 'test-api-key';
}
