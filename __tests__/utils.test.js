import { createGenerator, normalizeHex, rgb2hex, hex2rgb } from '../src/utils';
import { AssertionError } from 'assert';

describe('Color format converters', () => {

	test('rgb2hex should convert to proper hex color', () => {
		expect(rgb2hex([ 255, 0, 0 ])).toEqual('FF0000');
	});

	test('hex2rgb should convert to proper rgb array', () => {
		expect(hex2rgb('FF0000')).toEqual([ 255, 0, 0 ]);
	});

});

describe('createGenerator()', () => {

	const generator = createGenerator([ 255, 0, 0 ]);

	test('Should create a generator function', () => {
		expect(typeof generator).toEqual('function');
	});

	test('Should generate color with proper lightness', () => {
		expect(generator(50)).toEqual('#ef0000');
		expect(generator(10)).toEqual('#410000');
		expect(generator(23)).toEqual('#750000');
		expect(generator(90)).toEqual('#ffdada');
	});

	test('Should throw error on invalid parameter', () => {
		expect(() => generator(-1)).toThrow(AssertionError);
		expect(() => generator(101)).toThrow(AssertionError);

		// @ts-ignore
		expect(() => generator('1')).toThrow(AssertionError);
	});

});

describe('normalizeHex()', () => {
	test('Should handle the # prefix and converts to uppercase', () => {
		expect(normalizeHex('#cccccc')).toEqual('CCCCCC');
	});

	test('Should convert 3 digit to 6 digit hex', () => {
		expect(normalizeHex('fff')).toEqual('FFFFFF');
	});

	test('Should throw on invalid hex length', () => {
		expect(() => normalizeHex('ff')).toThrow(AssertionError);
	});

	test('Should throw on invalid hex color', () => {
		expect(() => normalizeHex('#efu')).toThrow(AssertionError);
	});

});