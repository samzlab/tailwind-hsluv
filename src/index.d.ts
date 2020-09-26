type hexColor = string;
type namedColor = string;
// enum namedColor {
//     MacaroniAndCheese = "Macaroni and Cheese"
// };

type colorTuple = [number, number, number];

interface generateOptions {
    step?: number = 100,
    hpluv?: boolean
};

type inputColor = hexColor | namedColor;

interface inputColors {
    [key: string]: inputColor
};

type colorVariations = {
    [lightness: string]: hexColor
}

type outputColors = {
    [key: string]: colorVariations
}

type generatorFunction = (lightness: number) => hexColor;

export function fromRGB(r: number, g: number, b: number, hpluv?: boolean = false): generatorFunction;

export function colorFromName(name: inputColor): colorTuple;

export function generateSteps(generator: generatorFunction, step: number): colorVariations

export function generateColors(colors: inputColors, options?: generateOptions): outputColors