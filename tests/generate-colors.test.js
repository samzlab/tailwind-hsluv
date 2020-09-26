const { generateColors } = require('../');

describe('Generate colors', () => {

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
		expect(generateColors({ red: 'red' })).toEqual({
			red: {
				100: '#FFD9E0',
				200: '#FFB1C0',
				300: '#FF86A1',
				400: '#FF4D81',
				500: '#EA0064',
				600: '#BC004F',
				700: '#90003B',
				800: '#660028',
				900: '#3F0016',
				default: '#FF0000'
			}
		});
	});

});