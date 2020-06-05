import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const production = process.env.NODE_ENV === 'production'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg['umd:main'],
      format: 'umd',
      sourcemap: !production,
    },
    plugins: [
      alias({
        entries: [
          { find: '@/', replacement: './src/' },
          { find: '@@/', replacement: './' },
        ],
      }),
      resolve(),
      commonjs(),
      typescript(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: !production,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: !production,
        plugins: [production ? terser() : false],
      },
    ],
    external: ['axios'],
    plugins: [
      alias({
        entries: [
          { find: '@/', replacement: './src/' },
          { find: '@@/', replacement: './' },
        ],
      }),
      typescript(),
      babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    ],
  },
]
