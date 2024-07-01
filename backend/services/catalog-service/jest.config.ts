import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  setupFiles: ['<rootDir>/jest.setup.ts'], 
  moduleNameMapper: {
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@interface/(.*)$": "<rootDir>/src/interface/$1",
    "^@repository/(.*)$": "<rootDir>/src/repository/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@dto/(.*)$": "<rootDir>/src/dto/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
