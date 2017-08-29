import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'src/GraphyX.js',
	dest: 'dist/graphyx.js',
	format: 'iife',
	plugins: [
		uglify()
	]
};