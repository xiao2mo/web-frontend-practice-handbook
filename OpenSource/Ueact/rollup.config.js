import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: false
    }),
    babel({
      include: ['src/**', 'node_modules/observer-x/dist/observer-x.es.js']
    }),
    uglify()
  ],
  format: 'umd',
  moduleName: 'Ueact'
};
