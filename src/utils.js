import { hpluvToHex, hsluvToHex, rgbToHsluv } from 'hsluv';

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

	return (lightness) => method([ hue, 100 - saturation, lightness ]);
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

	if (hex.length === 3) {
		parts = hex.match(/[0-9A-F]/gu).map((part) => `${part}${part}`);
	} else if (hex.length === 6) {
		parts = hex.match(/[0-9A-F]{2}/gu);
	}

	if (parts.length !== 3) {
		throw Error(`Invalid hex color: ${input}`);
	}

	return parts.join('');
}

/**
 * @param {import('../types/utils').hexColor} hex
 * @returns {import('../types/utils').rgbColor}
 */
export function hex2rgb(hex) {
	const parts = normalizeHex(hex).match(/[0-9A-F]{2}/gu);

	if (parts.length !== 3) {
		throw Error(`Invalid hex color: ${hex}`);
	}

	// @ts-ignore
	return parts.map((hexValue) => parseInt(hexValue, 16));
}

/**
 * @param {import('../types/utils').rgbColor} rgb
 * @returns {import('../types/utils').hexColor}
 */
export function rgb2hex(rgb) {
	return rgb.map((int) => int.toString(16).padStart(2, '0')).join('').toUpperCase();
}