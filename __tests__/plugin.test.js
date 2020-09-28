import { generateColors, hsluv } from '../src';

describe('Tailwind CSS Plugin', () => {
	test('Should resolve the same configuration object', () => {
		const colors = { red: 'red' };

		const expectedConfig = {
			theme: {
				extend: {
					colors: generateColors(colors)
				}
			}
		};

		const { config } = hsluv(colors);

		expect(config).toEqual(expectedConfig);
	});
});