module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true,
    node: true
  },

  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/recommended'
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  globals: {
    'process': true
  },

  // add your custom rules here
  rules: {
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': [2, 'tab'],
    'vue/require-default-prop': 'off',
    'one-var': 'off',
    indent: [2, 'tab'],
    'no-tabs': 0,
    semi: 0,
    'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
    'space-before-function-paren': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
