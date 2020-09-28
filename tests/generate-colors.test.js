const { generateColors, resolveColor } = require('../');

describe('Generate colors', () => {

	test('"red" should resolve to "#ff0000"', () => {
		expect(resolveColor('red')).toEqual({ hex: 'FF0000', rgb: [ 255, 0, 0 ] });
	});

	test('color variations has default key', () => {
		expect(generateColors({
			red: 'red'
		})).toHaveProperty([ 'red', 'default' ]);
	});

	test('variations (step=50) contains 50...950', () => {
		const colors = generateColors({ red: 'red' }, { step: 50 });

		expect(colors).toHaveProperty([ 'red', '50' ]);
		expect(colors).toHaveProperty([ 'red', '950' ]);
	});

	test('invalid step values (510, 45) should throw Error', () => {
		const colorMap = { red: 'red' };

		expect(() => generateColors(colorMap, { step: 510 })).toThrow(Error);
		expect(() => generateColors(colorMap, { step: 45 })).toThrow(Error);
	});

	test('by name "red"', () => {
		expect(generateColors({ red: 'red' })).toMatchSnapshot();
	});

});