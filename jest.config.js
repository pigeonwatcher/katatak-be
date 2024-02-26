const config = {
};

if (process.env.NODE_ENV !== 'production') {
  // Test config.
  /** @type {import('ts-jest').JestConfigWithTsJest} */
  config.preset = 'ts-jest';
  config.testEnvironment = 'node';
} else {
  // Development config.
  config.testEnvironment = 'node';
}

module.exports = config;