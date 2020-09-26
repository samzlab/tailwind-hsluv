import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		input: 'src/index.js',
		external: 'hsluv',
		output: {
			format: 'cjs',
			file: 'dist/index-cjs.js'
		},
		plugins: [
			nodeResolve(),
			commonjs()
		]
	},
	{
		input: 'src/index.js',
		external: 'hsluv',
		output: {
			format: 'esm',
			file: 'dist/index-esm.js'
		},
		plugins: [
			nodeResolve(),
			commonjs()
		]
	}
];