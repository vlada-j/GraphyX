// npm i -D @babel/core @babel/preset-env @rollup/plugin-babel rollup rollup-plugin-terser
import { terser } from "rollup-plugin-terser";
import babel from '@rollup/plugin-babel';

const config = {
	input: 'src/GraphyX.js',
	output: [
		{ file: 'dist/graphyx.js', format: 'cjs' }
	],
	plugins: [
		babel({ presets: ['@babel/preset-env'], babelHelpers: 'bundled' }),
		terser()
	]
};

export default config;
