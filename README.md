# HSLuv/HPLuv color space for TailwindCSS

[![npm](https://img.shields.io/npm/v/tailwind-hsluv)](https://www.npmjs.com/package/tailwind-hsluv) ![downloads](https://img.shields.io/npm/dm/tailwind-hsluv) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)![coverage](./coverage/badge.svg) [![MIT License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://github.com/samzlab/tailwind-hsluv/blob/master/LICENSE)

This package is made to experiment with the HSLuv/HPLuv color space which should be better for UI design. It's technically just a helper function which using the [hsluv](https://github.com/hsluv/hsluv/tree/master/javascript) library to generate the color variants for [TailwindCSS](https://tailwindcss.com/).

> **NEW**: From 0.1.4 this package is usable as **Tailwind CSS plugin**. 



## Why?

[Steve Schoger](https://twitter.com/steveschoger) made a beautiful color palette in Tailwind CSS, **but**: 

- you can't trust in the lightness variations. Even if the colors are hand-picked, if you use bg-blue-300 and bg-yellow-300 the perceived lightness will be different.
- the steps between the lightness variations sometimes not even



## How then?

The difference between **HSL** and **HSLuv**/**HPLuv**/**CIELUV** color spaces is the lightness value based on the human eye instead of how the monitor mixing the colors. With **HSLuv** we can generate the color variations based on the perceived lightness.

You can read about these here:
* [HSLuv comparsion to HSL](https://www.hsluv.org/comparison/)
* [Perceptually uniform color spaces](https://programmingdesignsystems.com/color/perceptually-uniform-color-spaces/)



## Credits

The HSLuv library made by [Alexei Boronine](https://www.boronine.com/)

The Color name list came from the [Name that color](http://chir.ag/projects/name-that-color/) library



## Installation

```bash
npm i tailwind-hsluv
# or
yarn add tailwind-hsluv
```



## Color names

The `generateColors` function accepts colors as `string` or `array`: 

* hex color like `"#RRGGBB"` or `"#CCC"`
* named color like `"Eastern Blue"` or `"Seaweed"`, etc. *(1)*
* RGB color array like: `[255, 0, 0]`

*(1) The color name lookup is case-insensitive. You can find the color names in the [source](./src/color-names.js) or you can pick one via the [Name that color](http://chir.ag/projects/name-that-color/) website.*



## Plugin usage

```javascript
// tailwind.config.js
const { hsluv } = require('tailwind-hsluv');

module.exports = {
    // ...your other config...
    plugins: [
        hsluv({
            superred: '#ff0000', // 6 digit hex color
            grayscale: '#ccc', // / 3 digit hex color
            blue: [ 0, 0, 255 ], // rgb array
            green: 'green', // simple named color
            mypurple: 'Jacksons Purple' // specific named color
        }, {
            step: 50, // default 100
            hpluv: false, // use the HPLuv color space, default: false
        }),
        // ...your other plugins...
    ]
};
```



## Generate colors directly

`generateColors(colorMap, options)`: generates the colors for TailwindCSS.

**Options:**

| name  | default | description                                |
| ----- | ------- | ------------------------------------------ |
| step  | `100`   | steps between the lightness values         |
| hpluv | `false` | use the HPLuv color space (less saturated) |

**Full example:**

```javascript
// tailwind.config.js
const { generateColors } = require('tailwind-hsluv');

module.exports = {
    theme: {
        extend: {
            colors: generateColors({
                superred: '#ff0000', // 6 digit hex color
                grayscale: '#ccc', /// 3 digit hex color
                blue: [0, 0, 255], // rgb array
                green: 'green', // simple named color
                mypurple: 'Jacksons Purple' // specific named color
            }, {
                step: 100, // steps between lightness variants, default: 100
                hpluv: false // use the HPLuv color space, default: false
            })
        }
    }
};
```

It will generate an object which usable for tailwind config, like this:

```javascript
{
    "red": {
        "100": "#FFDADA",
        "200": "#FFB3B3",
        "300": "#FF8888",
        "400": "#FF5353",
        "500": "#EF0000",
        "600": "#C00000",
        "700": "#930000",
        "800": "#690000",
        "900": "#410000",
        "default": "#FF0000"
	},
    "blue": {
        // ...
    },
    // another colors...
}
```



## Comparison between the color palettes

The "text" texts are colored with grayscale `hsl(0, 0%, 10%-90%)` and each of the boxes have a background color lightness variant from 100 to 900.

If the text lightness is closer to the background color lightness you less likely can see the difference between them.





![image-20200925214453451](assets/image-20200925214453451.png)



## Changelog

See [CHANGELOG.md](./CHANGELOG.md) (since 0.1.4), and  [CHANGELOG-old.md](./CHANGELOG-old.md) (before 0.1.4)



## License

Copyright © 2020 Kövesdi György

Licensed under the [MIT License](https://github.com/samzlab/tailwind-hsluv/blob/master/LICENSE).