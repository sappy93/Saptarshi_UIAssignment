module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleDirectories: ["node_modules", 'src'],
  roots: ['<rootDir>/src'],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
