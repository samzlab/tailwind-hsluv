import { hsluvToHex, hpluvToHex } from 'hsluv';
import colorNames from './color-names';

/* eslint-disable */
// based on https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;

	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	return [ h * 360, s * 100, l ];
}
/* eslint-enable */

function fromRGB(r, g, b, hpluv = false) {
	const [ h, s ] = rgbToHsl(r, g, b);

	const method = hpluv ? hpluvToHex : hsluvToHex;
	return (l) => method([ h, s, l ]);
}

function generateSteps(getter, step = 100) {
	const result = {};

	for (let i = step; i < 1000; i += step) {
		result[`${i}`] = getter(100 - (i / 10));
	}

	return result;
}

function hexToRGB(hex) {
	return hex.match(/.{2}/gu).map((v) => parseInt(v, 16));
}


function colorFromName(name) {
	name = name.toLowerCase();

	const [ hex ] = colorNames.find(([ , colorName ]) => colorName.toLowerCase() === name) || [];

	if (!hex) {
		throw Error(`color name not found: ${name}`);
	}

	return hexToRGB(hex);
}

function generateColors(colors, { step = 100, hpluv = false } = {}) {
	return Object.entries(colors).reduce((result, [ key, colorName ]) => {
		const color = colorName.charAt(0) === '#' ? hexToRGB(colorName.slice(1)) : colorFromName(colorName);

		result[key] = generateSteps(fromRGB(...color, hpluv), step);
		return result;
	}, {});
}


export {
	fromRGB,
	colorFromName,
	generateSteps,
	generateColors
};