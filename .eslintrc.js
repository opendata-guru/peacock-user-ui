// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js'],
    }],
    'max-len': [0],
    'no-shadow': ["error", { "builtinGlobals": false, "hoist": "functions", "allow": ['state'] }],
    'no-param-reassign': ["error", { "props": true, "ignorePropertyModificationsFor": ['state'] }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "linebreak-style": 0,
    "indent": ["error", 2],
    "prefer-destructuring": ["error", {
      "array": false,
      "object": false,
    }, {
      "enforceForRenamedProperties": false,
    }],
  },
};
