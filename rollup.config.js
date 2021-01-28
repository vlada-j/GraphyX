// npm i -D @babel/core @babel/preset-env @rollup/plugin-babel rollup rollup-plugin-uglify
import { uglify } from "rollup-plugin-uglify";
import babel from '@rollup/plugin-babel';

const config = {
	input: 'src/GraphyX.js',
	output: [
		{ file: 'dist/graphyx.js', format: 'cjs' }
	],
	plugins: [
		babel({ presets: ['@babel/preset-env'], babelHelpers: 'bundled' }),
		uglify()
	]
};

export default config;
