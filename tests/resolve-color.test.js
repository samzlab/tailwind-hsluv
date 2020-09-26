const { resolveColor } = require('../dist/index-cjs.js');

describe('resolve color utility', () => {
	test('by name', () => {
		expect(resolveColor('red')).toEqual({
			rgb: [ 255, 0, 0 ],
			hex: 'FF0000'
		});
	});

	test('by case-insensitive name', () => {
		expect(resolveColor('cHiLean Heath')).toEqual({
			rgb: [ 255, 253, 230 ],
			hex: 'FFFDE6'
		});
	});

	test('by hex value: "#CCCCCC"', () => {
		expect(resolveColor('#CCCCCC')).toEqual({
			rgb: [ 204, 204, 204 ],
			hex: 'CCCCCC'
		});
	});

	test('by short hex value: "#CCC"', () => {
		expect(resolveColor('#CCC')).toEqual({
			rgb: [ 204, 204, 204 ],
			hex: 'CCCCCC'
		});
	});

	test('by rgb array: [ 204, 204, 204 ]', () => {
		expect(resolveColor([ 204, 204, 204 ])).toEqual({
			rgb: [ 204, 204, 204 ],
			hex: 'CCCCCC'
		});
	});
});