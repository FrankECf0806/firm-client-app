// jest.config.ts
import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {Config} */
const customJestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",

  testMatch: [
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/src/**/*.test.tsx",
    "<rootDir>/tests/unit/**/*.test.ts",
    "<rootDir>/tests/unit/**/*.test.tsx",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  collectCoverage: true,
  coverageReporters: ["html", "text", "lcov"],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/tests/",
    "<rootDir>/coverage/",
    ".d.ts$",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(customJestConfig);