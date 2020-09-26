import { hexColor, rgbColor } from './utils';

import { rgbColor, hexColor, generatorFunction } from './utils.d.ts';

export type colorTuple = [number, number, number];

export interface generateOptions {
    step?: number = 100,
    hpluv?: boolean
};

export type inputColor = rgbColor | string | hexColor;

export interface inputColorsMap {
    [key: string]: inputColor
};

export type colorVariations = {
    [lightness: string]: hexColor
}

export type TailwindColorsConfig = {
    [color: string]: colorVariations
}

export type colorResult = {
    rgb: rgbColor,
    hex: hexColor
};

export function resolveColor(color: inputColor): colorResult

export function generateSteps(generator: generatorFunction, step: number): colorVariations

export function generateColors(colors: inputColorsMap, options?: generateOptions): TailwindColorsConfig