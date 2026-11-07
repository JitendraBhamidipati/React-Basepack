// Polyfill TextEncoder/TextDecoder — required by react-router in jsdom
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

// Import @testing-library/jest-dom using the Jest-30-compatible entry point.
// This augments @jest/expect's Matchers interface (not the legacy jest namespace).
import '@testing-library/jest-dom/jest-globals';
