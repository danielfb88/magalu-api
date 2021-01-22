module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**', 'tests/**'],
  coveragePathIgnorePatterns: [
    '/artifact/',
    '/tests/',
    '/node_modules/',
    '/src/main',
    'server.ts',
    'src/errors/database-connection-error.ts',
    'src/integrations/',
    'src/errors/',
  ],
  coverageReporters: ['json-summary', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  setupFiles: ['<rootDir>/tests/setEnvVars.js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/{src,tests}/**/*.test.ts?(x)'],
  testTimeout: 60000,
  // testResultsProcessor: 'jest-sonar-reporter',
  setupFilesAfterEnv: ['<rootDir>/tests/jest-preload.js'],
}
