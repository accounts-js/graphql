import babel from 'rollup-plugin-babel';

function onwarn(message) {
  const suppressed = [
    'UNRESOLVED_IMPORT',
    'THIS_IS_UNDEFINED',
  ];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'umd',
  },
  name: 'accounts.graphqlApi',
  exports: 'named',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
  globals: {
    'babel-runtime/core-js/object/assign': 'Object.assign',
    'babel-runtime/helpers/defineProperty': 'Object.defineProperty',
    'babel-runtime/regenerator': 'regeneratorRuntime',
  },
  onwarn,
};