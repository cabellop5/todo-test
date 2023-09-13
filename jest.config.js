module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/application/**/*.ts', 'src/domain/**/*.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}
