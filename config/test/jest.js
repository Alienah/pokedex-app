module.exports = {
  rootDir: '../../',
  preset: 'ts-jest',
  restoreMocks: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/config/test/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/test/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
};
