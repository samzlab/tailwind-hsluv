import { hexColor } from "./utils";

export type colorPair = [string, string];
export type colorNames = Array<colorPair>;

export function hexFromColorName(name: string): hexColor;

export default colorNames;