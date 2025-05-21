module.exports = {
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)',
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}; 