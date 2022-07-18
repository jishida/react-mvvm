require('dotenv').config();
const presets = require('ts-jest/presets');

function match(key, ignoreAll) {
  return process.env.TEST_TYPES.split(',').some(
    (t) => (!ignoreAll && t.trim() === 'all') || t.trim() === key
  );
}

const projects = [];

if (match('standard')) {
  projects.push({
    displayName: 'Standard Test',
    testRegex: '/(core|extensions)/[^/]*\\.spec\\.ts$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupExtensions.ts'],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
    },
  });
}

if (match('internal')) {
  projects.push({
    displayName: 'Internal Test',
    testRegex: '/internal/[^/]*\\.spec\\.ts$',
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
    },
  });
}

if (match('react')) {
  projects.push({
    displayName: 'React v16 Test',
    testRegex: '/(core|extensions|internal)/[^/]*\\.spec\\.tsx$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupExtensions.ts'],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
    },
  });
}

if (match('react17')) {
  projects.push({
    displayName: 'React v17 Test',
    testRegex: '/(core|extensions|internal)/[^/]*\\.spec\\.tsx$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupExtensions.ts'],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
      '^react$': 'react17',
      '^react-dom$': 'react-dom17',
      '^react-dom/test-utils$': 'react-dom17/test-utils',
      '^react-test-renderer$': 'react-test-renderer17',
    },
  });
}

if (match('preact')) {
  projects.push({
    displayName: 'Preact Test',
    testRegex: '/(core|extensions|internal)/[^/]*\\.spec\\.tsx$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupExtensions.ts'],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
      '^react$': 'preact/compat',
      '^react-dom/test-utils$': 'preact/test-utils',
      '^@testing-library/react$': '@testing-library/preact',
    },
  });
}

if (match('preact-unique')) {
  projects.push({
    displayName: 'Preact Unique Test',
    testRegex: '/preact/[^/]*\\.spec\\.ts$',
    moduleNameMapper: {
      '^react$': '<rootDir>/tests/utils/preactHooks.ts',
      '^@jishida/react-mvvm$': '<rootDir>/src',
    },
  });
}

if (match('module')) {
  projects.push({
    displayName: 'Module Test',
    testRegex: '/(core|extensions)/[^/]*\\.spec\\.ts$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupExtensions.ts'],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>',
    },
  });
}

if (match('module-lite')) {
  projects.push({
    displayName: 'Module Test (Lite)',
    testRegex: '/core/[^/]*\\.spec\\.ts$',
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/lite',
    },
  });
}

if (match('experimental', true)) {
  projects.push({
    displayName: 'Experimental Test',
    testRegex: '/experimental/[^/]*\\.spec\\.tsx?$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupExtensions.ts'],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
    },
  });
}

if (!projects.length) {
  throw new Error(`No test found.
Set the TEST_TYPES environment variable to a comma-separated list of test types.
test types: all, standard, internal, react, preact, preact-unique, module, module-lite
`);
}

module.exports = {
  projects: projects.map((project) => ({
    roots: ['<rootDir>/tests'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.m?jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [`/node_modules/(?!preact)/`],
    globals: {
      'ts-jest': {
        tsconfig: 'tests/tsconfig.json',
      },
    },
    ...project,
  })),
  collectCoverageFrom: ['**/src/**', '!**/tests/**'],
};
