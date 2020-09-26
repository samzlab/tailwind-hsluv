import { rgb2hex, hex2rgb, createGenerator, normalizeHex } from './utils.js';
import { hexFromColorName } from './color-names';

/**
 *
 * Generate color variants by hsluv color generator function for each step evenly
 *
 * @param { import('../types/utils').generatorFunction } generator
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
 * Resolve a inputColor string or array to rgb/hex values
 *
 * @param {import('../types/index').inputColor} color
 */
export function resolveColor(color) {
	/** @type {import('../types/utils').rgbColor} */
	let rgb;

	/** @type {import('../types/utils').hexColor} */
	let hex;

	if (Array.isArray(color)) {

		rgb = color;
		hex = rgb2hex(rgb);

	} else if (typeof color === 'string') {

		if (color.charAt(0) === '#') {
			hex = normalizeHex(color);
		} else {
			hex = hexFromColorName(color);
		}

		rgb = hex2rgb(hex);

	} else {

		throw Error(`Invalid color value: ${color} (expected String or Array instead of ${typeof color})`);

	}

	return { rgb, hex };
}

/**
 *
 * Generate color variants for TailwindCSS config by color map
 *
 * @param { import('../types/index').inputColorsMap } colors
 * @param { import('../types/index').generateOptions } options
 *
 */
export function generateColors(colors, { step = 100, hpluv = false } = {}) {
	return Object.entries(colors).reduce((result, [ key, /** @type { import('../types/index').inputColor } */ inputColor ]) => {
		const { rgb, hex } = resolveColor(inputColor);

		result[key] = generateSteps(createGenerator(rgb, hpluv), step);
		result[key].default = `#${hex}`;

		return result;
	}, {});
}