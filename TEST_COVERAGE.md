# Test Coverage Documentation

## Overview
This document describes the comprehensive test suite for the HR Assistant application. The test suite covers all major functionality, edge cases, and user interactions.

## Test File Location
`src/HrAssistant.test.jsx`

## Test Categories

### 1. Component Rendering Tests
- ✅ Component renders without crashing
- ✅ Title displays correctly
- ✅ Welcome message displays when no messages exist
- ✅ Suggested questions display initially
- ✅ Input field renders with correct placeholder
- ✅ Send button renders
- ✅ Dark mode toggle button renders
- ✅ Clear chat button only appears when messages exist

### 2. User Input Handling Tests
- ✅ User can type in input field
- ✅ Input clears after sending message
- ✅ Empty input validation (prevents sending)
- ✅ Whitespace-only input validation

### 3. Message Sending Tests
- ✅ Send message via button click
- ✅ Send message via Enter key press
- ✅ Shift+Enter creates new line (doesn't send)
- ✅ System message included in API request
- ✅ Correct model and parameters used (gpt-3.5-turbo, temperature, max_tokens)
- ✅ User message displayed after sending
- ✅ Assistant response displayed after API call
- ✅ Multiple messages in conversation

### 4. Loading States Tests
- ✅ Loading indicator displays while waiting
- ✅ Send button disabled during loading
- ✅ Input field disabled during loading

### 5. Error Handling Tests
- ✅ API request failure handling
- ✅ Network error handling
- ✅ Generic error message for errors without message
- ✅ User message preserved even when API fails
- ✅ Error message can be dismissed
- ✅ API response with no choices handled
- ✅ Empty API response handled
- ✅ Malformed JSON response handled

### 6. Suggested Questions Tests
- ✅ Clicking suggested question populates input
- ✅ Can send message after clicking suggested question

### 7. Dark Mode Toggle Tests
- ✅ Toggle to dark mode works
- ✅ Toggle back to light mode works

### 8. Clear Chat Functionality Tests
- ✅ Clear button appears when messages exist
- ✅ Messages cleared when confirmed
- ✅ Messages not cleared when cancelled
- ✅ Error message cleared when chat cleared
- ✅ localStorage cleared when chat cleared

### 9. LocalStorage Persistence Tests
- ✅ Messages loaded from localStorage on mount
- ✅ Messages saved to localStorage when added
- ✅ Corrupted localStorage data handled gracefully
- ✅ Missing localStorage data handled gracefully

### 10. Edge Cases Tests
- ✅ Empty API response handled
- ✅ API response with no choices handled
- ✅ Malformed JSON response handled
- ✅ Prevents multiple simultaneous sends

### 11. Accessibility Tests
- ✅ Accessible button labels
- ✅ Accessible input field

## Test Statistics

- **Total Test Cases**: 50+
- **Coverage Areas**: 
  - Component rendering
  - User interactions
  - API integration
  - Error handling
  - State management
  - LocalStorage persistence
  - UI features (dark mode, suggested questions, clear chat)

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Mocking

The test suite uses the following mocks:
- **fetch API**: Mocked to simulate API responses
- **localStorage**: Mocked to test persistence
- **window.confirm**: Mocked to test clear chat confirmation
- **import.meta.env**: Handled via environment variables (defaults to 'test-api-key')

## Test Helpers

The test suite includes helper functions:
- `mockSuccessfulFetch(response)`: Mocks a successful API response
- `mockFailedFetch(status, errorMessage)`: Mocks a failed API response
- `mockNetworkError()`: Mocks a network error

## Notes

- The API key missing test is simplified due to `import.meta.env` being evaluated at compile time in Vite
- All async operations use `waitFor` for proper timing
- Tests are isolated and reset mocks between runs
- localStorage is cleared between tests

## Future Enhancements

Potential areas for additional test coverage:
- Integration tests with actual API (optional)
- Visual regression tests
- Performance tests
- Cross-browser compatibility tests
