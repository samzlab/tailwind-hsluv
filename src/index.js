import { rgb2hex, hex2rgb, createGenerator } from './utils.js';
import { hexFromColorName } from './color-names';

/**
 *
 * Generate color variants by hsluv color generator function for each step evenly
 *
 * @param { import('./utils').generatorFunction } generator
 * @param { number } step
 *
 */
export function generateSteps(generator, step = 100) {
	const result = {};

	for (let i = step; i < 1000; i += step) {
		result[`${i}`] = generator(100 - (i / 10));
	}

	return result;
}

/**
 *
 * Generate color variants for TailwindCSS config by color map
 *
 * @param colors { import('./index').inputColorsMap }
 * @param options { import('./index').generateOptions }
 *
 */
export function generateColors(colors, { step = 100, hpluv = false } = {}) {
	return Object.entries(colors).reduce((result, [ key, /** @type { import('./index').inputColor } */ inputColor ]) => {
		let rgb;
		let hex;

		if (Array.isArray(inputColor)) {

			rgb = inputColor;
			hex = rgb2hex(rgb);

		} else if (typeof inputColor === 'string') {

			if (inputColor.charAt(0) === '#') {
				hex = inputColor.slice(1);
			} else {
				hex = hexFromColorName(inputColor);
			}

			rgb = hex2rgb(hex);

		} else {

			throw Error(`Invalid color value: ${inputColor} (expected String or Array instead of ${typeof inputColor})`);

		}

		result[key] = generateSteps(createGenerator(rgb, hpluv), step);
		result[key].default = `#${hex}`;

		return result;
	}, {});
}