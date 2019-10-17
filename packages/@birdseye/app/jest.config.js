module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,vue}', '!**/*.d.ts']
}
