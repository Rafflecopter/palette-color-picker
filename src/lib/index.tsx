import './picker.scss'
import * as React from 'react'
import cls from '~/lib/util/className'
import Color from 'tinycolor2'

import ColorInspector from '~/lib/_subcomponents/color/inspector'
import ColorSliders from '~/lib/_subcomponents/color/sliders'
import ColorValues from '~/lib/_subcomponents/color/values'
import { SwatchList, ColorSwatches } from '~/lib/_subcomponents/color/swatches'


//------------------------------------------------------------------------------
// Props

interface Props {
  defaultColorValue?: string
  modes?: ColorMode[]
  mode?: ColorMode
  disabled?: boolean
  update?: Function

  showInspector?: boolean
  showSliders?: boolean
  showValues?: boolean

  showSwatches?: boolean
  swatches?: SwatchList
  swatchesLabel?: string
  swatchesTooltip?: boolean
}

interface State {
  color: Color
  mode: ColorMode
  export: string
}


export type ColorMode = 'hex' | 'hex8' | 'rgb' | 'hsl'

//------------------------------------------------------------------------------

export
  class ColorPicker extends React.Component<Props, State> {
  modes: ColorMode[]

  constructor(props) {
    super(props)
    this.modes = this.props.modes || ['hex', 'rgb', 'hsl']

    this.state = {
      color: new Color(this.props.defaultColorValue || 'red'),
      mode: this.props.mode || 'rgb',
      export: ''
    }
  }

  componentDidMount() {
    this.setState({ mode: this.state.color._format })
    this.setColorString(this.state.color, this.state.color._format)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value
      }
    }

    return null
  }

  render() {
    const mods = {
      'isLight': this.state.color.isLight(),
      'isDark': this.state.color.isDark()
    }

    return (
      <div className={cls(this, mods)}>
        {this.props.showInspector !== false &&
          <div className={cls(this, 'board')}>
            <ColorInspector color={this.state.color} update={this.onChange} />
          </div>
        }
        {this.props.showSliders !== false &&
          <div className={cls(this, 'sliders')}>
            <ColorSliders color={this.state.color} modes={this.modes} mode={this.state.mode} update={this.onChange} />
          </div>
        }
        {this.props.showValues !== false &&
          <div className={cls(this, 'values')}>
            <ColorValues color={this.state.color} modes={this.modes} mode={this.state.mode} update={this.onChange} />
          </div>
        }
        {this.props.showSwatches !== false && this.props.swatches &&
          <div className={cls(this, 'swatches')}>
            <ColorSwatches swatches={this.props.swatches} tooltips={this.props.swatchesTooltip} label={this.props.swatchesLabel} update={this.onChange} />
          </div>
        }
      </div>
    )
  }

  onChange = (color, mode?) => {
    color = typeof color !== Color ? Color(color) : null
    mode = mode ? mode : this.state.mode

    this.setState({ color, mode })
    this.setColorString(color, mode)
  }

  setColorString = (color, mode) => {
    const exp = () => {
      switch (mode || this.state.mode) {
        case 'rgb':
          return (color.toRgbString())
        case 'hsl':
          return (color.toHslString())
        case 'hex':
        default:
          if (color.getAlpha() < 1) {
            return (color.toHex8String())
          } else {
            return (color.toHexString())
          }
      }
    }

    this.props.update ? this.props.update(exp()) : null
    this.setState({ export: exp() })
  }
}
