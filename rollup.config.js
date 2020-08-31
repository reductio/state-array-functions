import {terser} from 'rollup-plugin-terser';

export default {
    input: 'index.js',
    output: {
      file: 'dist/bundle.min.js',
      format: 'cjs',
      plugins: [terser()]
    }
  };