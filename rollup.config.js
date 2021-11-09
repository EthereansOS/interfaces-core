import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import visualizer from 'rollup-plugin-visualizer'
import json from '@rollup/plugin-json'
import sourcemaps from 'rollup-plugin-sourcemaps'
import pkg from './package.json'

export default {
  input: './src/index.js',
  output: [
    {
      sourcemap: true,
      file: pkg.main,
      format: 'cjs',
    },
    {
      sourcemap: true,
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [
    sourcemaps(),
    external(),
    postcss(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    image(),
    visualizer(),
    json()
  ],
}
