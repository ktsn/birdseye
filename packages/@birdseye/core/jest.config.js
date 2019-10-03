module.exports = {
  transform: {
    '^.+\\.[jt]s$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  setupFiles: ['<rootDir>/test/setup.ts'],
  testURL: 'http://localhost',
  testRegex: '/test/.+\\.spec\\.(js|ts)$',
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.runtime.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  collectCoverageFrom: ['src/**/*.{ts,vue}'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
}
