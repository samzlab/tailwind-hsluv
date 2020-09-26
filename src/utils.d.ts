export type hslColor = [number, number, number];
export type rgbColor = [number, number, number];
export type hexColor = string;

export type generatorFunction = (lightness: number) => hexColor;

export function rgbToHsl(rgb: rgbColor): hslColor;

export function createGenerator(rgb: rgbColor, hpluv: boolean = false): generatorFunction;

export function hex2rgb(hex: hexColor): rgbColor;

export function rgb2hex(rgb: rgbColor): hexColor;