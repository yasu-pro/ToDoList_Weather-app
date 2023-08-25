module.exports = {
    // CSSファイルをモックする設定を追加  
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    },
    testEnvironment: 'jest-environment-jsdom',
  };
