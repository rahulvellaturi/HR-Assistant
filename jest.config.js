// jest.config.js
export const testEnvironment = 'jsdom';
export const setupFiles = ['regenerator-runtime/runtime'];
export const moduleNameMapper = {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
};
export const transform = {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
};
export const transformIgnorePatterns = [
    '/node_modules/',
    '/bower_components/',
];
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];