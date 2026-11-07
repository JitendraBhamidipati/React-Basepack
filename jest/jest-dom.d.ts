// Augment Jest 30's @jest/expect Matchers with @testing-library/jest-dom.
// The '/jest-globals' entry point targets @jest/expect (Jest 30+),
// while the root entry targets the legacy 'jest' namespace (@types/jest).
import '@testing-library/jest-dom/jest-globals';
