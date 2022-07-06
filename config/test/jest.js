module.exports = {
  rootDir: '../../',
  preset: 'ts-jest',
  restoreMocks: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/config/test/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/test/__mocks__/fileMock.js',
    '^common(.*)$': '<rootDir>/src/common$1',
    '^core(.*)$': '<rootDir>/src/core$1',
    '^pods(.*)$': '<rootDir>/src/pods$1',
    '^scenes(.*)$': '<rootDir>/src/scenes$1',
  },
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
};
