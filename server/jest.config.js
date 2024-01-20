/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   '^.+\\.(ts|tsx)?$': 'ts-jest',
  //   '^.+\\.(js|jsx)$': 'babel-jest',
  // },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globalTeardown: "./test/teardown.js",
  modulePathIgnorePatterns: ["<rootDir>/dist/"]
};