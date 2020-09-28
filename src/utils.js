import { hpluvToHex, hsluvToHex, rgbToHsluv } from 'hsluv';
import assert from 'assert';

/**
 *
 * @param {import('../types/utils').rgbColor} rgb
 * @param {boolean} hpluv
 *
 * @returns { import('../types/utils').generatorFunction }
 */
export function createGenerator(rgb, hpluv = false) {
	const [ hue, saturation ] = rgbToHsluv(rgb);
	const method = hpluv ? hpluvToHex : hsluvToHex;

	return (lightness) => {
		assert(typeof lightness === 'number', 'Lightness value must be a number');
		assert(lightness >= 0 && lightness <= 100, 'Lightness value must be between 0-100)');

		return method([ hue, 100 - saturation, lightness ]);
	};
}

/**
 * @param {string} hex
 */
export function normalizeHex(hex) {
	/** @type {string[]} */
	let parts = [];
	let input = hex;

	hex = hex.toUpperCase();

	if (hex.charAt(0) === '#') {
		hex = hex.slice(1);
	}

	assert(hex.match(/^[0-9A-F]{3,6}$/ui), `Invalid hex color value: ${input}`);

	if (hex.length === 3) {
		parts = hex.match(/[0-9A-F]/gu).map((part) => `${part}${part}`);
	} else if (hex.length === 6) {
		parts = hex.match(/[0-9A-F]{2}/gu);
	}

	assert(parts.length === 3, `Invalid hex color length: ${input}`);

	return parts.join('');
}

/**
 * @param {import('../types/utils').hexColor} hex
 * @returns {import('../types/utils').rgbColor}
 */
export function hex2rgb(hex) {
	const parts = normalizeHex(hex).match(/[0-9A-F]{2}/gu);

	assert(parts.length === 3, `Invalid hex color: ${hex}`);

	const rgb = parts.map((hexValue) => parseInt(hexValue, 16));

	assert(!rgb.find((part) => part < 0 || part > 255), `Hex color (${hex}) resolved to invalid rgb(${rgb.join(',')})`);

	// @ts-ignore
	return rgb;
}

/**
 * @param {import('../types/utils').rgbColor} rgb
 * @returns {import('../types/utils').hexColor}
 */
export function rgb2hex(rgb) {
	return rgb.map((int) => int.toString(16).padStart(2, '0')).join('').toUpperCase();
}