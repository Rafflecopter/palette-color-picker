
# 🎨 @palette/color-picker
A hackable React color picker that exposes all the right things


---


### Why another color picker?

**Multiple Color Formats**<br>
This color picker supports rgb(a), hsl(a), and hex(8), and will return a color in the format _you_ (or your user) chooses.

**Mix n match**<br>
Don't get stuck using a color picker that has a predetermined configuration. Use props to mix and match different color editing components. And they actually all play nicely together.

## Demo

[See the picker in action](https://rafflecopter.github.io/palette-color-picker/)
(open the console and watch it print a color)

## Including in your project

`@palette/color-picker` may be included as a [node](http://nodejs.org/) module like so:

    npm install @palette/color-picker

Then it can be imported in your project like so:
```js
import ColorPicker from '@palette/color-picker'
```

## Usage
```js
<ColorPicker value={'#FF0'} />
```

---

## Component Configuration with Props
#### `showInspector`
| Type     | Required? | Default   |
| -------  | :-------: | :-------: |
| `string` |  **YES**  |  `red`  |

The initial rendered color for your component & the only required
Should be a string containing a valid color (rgb(a), hex(8), hsl(a), hsv)


#### `modes`
| Type   | Required?  | Default   |
| ------  | :-------: | :-------: |
| `array` |  N        |  `['hex', 'hex8', 'rgb', 'hsl']`  |

An array of color formats to accept

#### `mode`
| Type     | Required? | Default   |
| ------   | :-------: | :-------: |
| `string` |  N        |  color mode of `defaultValue`  |
The mode with which to initialize the picker.

#### `update`
| Type            | Required? | Default   |
| --------------- | :-------: | :-------: |
| `function(evt)` |  N  | none  |

A function to which the picker will return a color on updates.<br />
`evt` is the color in the prescribed mode.


---

### Subcomponent Configuration with Props
#### `showInspector`
| Type   | Required? | Default   |
|------  | :-------: | :-------: |
| `bool` |     N     |    true   |

Chooses whether to show the Color Inspector (eyedropper) subcomponent


#### `showSliders`
| Type   | Required? | Default   |
|------- | :-------: | :-------: |
| `bool` |     N     |    true   |

Chooses whether to show the Color Range Sliders (hue & opacity)

#### `showValues`
| Type   | Required? | Default   |
|------- | :-------: | :-------: |
| `bool` |     N     |    true   |

Chooses whether to show the Color Value Editor subcomponent


### Custom Swatch Recommendations

#### `showSwatches`
| Type   | Required? | Default   |
|------- | :-------: | :-------: |
| `bool` |     N     |    true   |

Chooses whether to show the Color Swatch subcomponent

#### `swatches`
| Type       | Required? | Default   |
|----        | :-------: | :-------: |
| `object[]` |     N     |    true   |

Prescribe the default swatches that are shown in the color picker like:

```js
[{
    name: 'some purpley pink',
    value: 'hsl(300, 76%, 72%, 0.67)',
    mode: 'hsl'
  }...]
```

#### `swatchesLabel`
| Type     | Required? | Default   |
| -------  | :-------: | :-------: |
| `string` |     N     | ''        |

Provide a label to describe your swatches

#### `swatchesTooltip`
| Type   | Required? | Default   |
| -----  | :-------: | :-------: |
| `bool` |     N     |  true     |

Chooses whether to show a tooltip revealing a color's name of swatch hover
