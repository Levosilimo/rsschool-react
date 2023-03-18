import type { JestConfigWithTsJest } from 'ts-jest';
const config: JestConfigWithTsJest = {
  testEnvironment: './test/env.ts',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!./src/index.tsx',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './test/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./test/setupTests.ts'],
};

export default config;
