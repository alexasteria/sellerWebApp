import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Runs a clean-up after each test case (e.g., clearing JSDOM)
afterEach(() => {
  cleanup();
});
