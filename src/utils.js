import { hpluvToHex, hsluvToHex } from 'hsluv';

// based on https://gist.github.com/mjackson/5311256
/**
 *
 * @param {import('./utils').rgbColor} param0
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
 * @param {import('./utils').rgbColor} rgb
 * @param {boolean} hpluv
 *
 * @returns { import('./utils').generatorFunction }
 */
export function createGenerator(rgb, hpluv = false) {
	const [ hue, saturation ] = rgbToHsl(rgb);
	const method = hpluv ? hpluvToHex : hsluvToHex;

	return (lightness) => method([ hue, saturation, lightness ]);
}

/**
 * @param {string} hex
 */
export function hex2rgb(hex) {
	/** @type {string[]} */
	let parts = [];
	let input = hex;

	if (hex.charAt(0) === '#') {
		hex = hex.slice(1);
	}

	if (hex.length === 3) {
		parts = hex.match(/[0-9a-f]/gui).map((part) => `${part}${part}`);
	} else if (hex.length === 6) {
		parts = hex.match(/[0-9a-f]{2}/gui);
	}

	if (parts.length !== 3) {
		throw Error(`Invalid hex color: ${input}`);
	}

	return parts.map((hexValue) => parseInt(hexValue, 16));
}

/**
 * @param {import('./utils').rgbColor} rgb
 */
export function rgb2hex(rgb) {
	return rgb.map((int) => int.toString(16)).join('');
}