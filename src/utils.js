import { hpluvToHex, hsluvToHex } from 'hsluv';

// based on https://gist.github.com/mjackson/5311256
/**
 *
 * @param {import('../types/utils').rgbColor} param0
 */
export function rgbToHsl([ r, g, b ]) {
	r /= 255;
	g /= 255;
	b /= 255;

	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		/* eslint-disable no-mixed-operators */
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
			default: break;
		}
		/* eslint-enable no-mixed-operators */

		h /= 6;
	}

	return [ h * 360, s * 100, l ];
}

/**
 *
 * @param {import('../types/utils').rgbColor} rgb
 * @param {boolean} hpluv
 *
 * @returns { import('../types/utils').generatorFunction }
 */
export function createGenerator(rgb, hpluv = false) {
	const [ hue, saturation ] = rgbToHsl(rgb);
	const method = hpluv ? hpluvToHex : hsluvToHex;

	return (lightness) => method([ hue, saturation, lightness ]);
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
	return rgb.map((int) => int.toString(16)).join('').toUpperCase();
}