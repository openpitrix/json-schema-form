import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    exports: 'named',
    name: 'JsonSchemaForm',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
    },
  },
  plugins: [
    babel({
      exclude: /node_modules/,
    }),

    resolve({
      extensions: ['.js', '.mjs', '.jsx', '.json'],
    }),

    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react/index.js': [
          'Component',
          'PureComponent',
          'Children',
          'Fragment',
        ],
      },
    }),
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'classnames',
    'styled-components',
    'backbone',
  ],
};
