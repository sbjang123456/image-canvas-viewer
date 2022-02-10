import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import json from '@rollup/plugin-json';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.scss'];

process.env.BABEL_ENV = 'production';

function setUpRollup({ input, output }) {
  return {
    input,
    exports: 'named',
    output,
    watch: {
      include: '*',
      exclude: 'node_modules/**',
    },
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({ extensions }),
      commonjs({
        include: /node_modules/,
      }),
      typescript({ useTsconfigDeclarationDir: true }),
    //   process.env.NODE_ENV === 'development' && html(),
    //   process.env.NODE_ENV === 'development' && serve('build'),
    ],
    external: ['react', 'react-dom'],
  };
}

export default [
  setUpRollup({
    input: 'src/index.tsx',
    output: {
      file: 'build/cjs.js',
      sourcemap: true,
      format: 'cjs',
    },
  }),
  setUpRollup({
    input: 'src/index.tsx',
    output: {
      file: 'build/esm.js',
      sourcemap: true,
      format: 'esm',
    },
  }),
];