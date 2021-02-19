require('dotenv').config();

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
    displayName: 'React Test',
    testRegex: '/(core|extensions|internal)/[^/]*\\.spec\\.tsx$',
    setupFilesAfterEnv: [
      '<rootDir>/tests/utils/setupEnzyme.ts',
      '<rootDir>/tests/utils/setupExtensions.ts',
    ],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
    },
  });
}

if (match('preact')) {
  projects.push({
    displayName: 'Preact Test',
    testRegex: '/(core|extensions|internal)/[^/]*\\.spec\\.tsx$',
    setupFilesAfterEnv: [
      '<rootDir>/tests/utils/setupEnzyme.ts',
      '<rootDir>/tests/utils/setupExtensions.ts',
    ],
    moduleNameMapper: {
      '^@jishida/react-mvvm$': '<rootDir>/src',
      '^react$': 'preact/compat',
      '^react-dom/test-utils$': 'preact/test-utils',
      '^enzyme-adapter-react-16$': 'enzyme-adapter-preact-pure',
    },
  });
}

if (match('preact-unique')) {
  projects.push({
    displayName: 'Preact Unique Test',
    testRegex: '/preact/[^/]*\\.spec\\.ts$',
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setupEnzyme.ts'],
    moduleNameMapper: {
      '^react$': 'preact',
      '^@jishida/react-mvvm$': '<rootDir>/src',
      '^enzyme-adapter-react-16$': 'enzyme-adapter-preact-pure',
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
    setupFilesAfterEnv: [
      '<rootDir>/tests/utils/setupEnzyme.ts',
      '<rootDir>/tests/utils/setupExtensions.ts',
    ],
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
  projects: projects.map((project) => {
    return {
      preset: 'ts-jest',
      roots: ['<rootDir>/tests'],
      globals: {
        'ts-jest': {
          tsconfig: 'tests/tsconfig.json',
        },
      },
      ...project,
    };
  }),
  collectCoverageFrom: ['**/src/**', '!**/tests/**'],
};
