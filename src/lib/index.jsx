import './picker.scss'
import * as React from 'react'
import Color from 'tinycolor2'
import PropTypes from 'prop-types'

import ColorInspector from './_subcomponents/color/inspector'
import ColorSliders from './_subcomponents/color/sliders'
import ColorValues from './_subcomponents/color/values'
import ColorSwatches from './_subcomponents/color/swatches'

//------------------------------------------------------------------------------

const ColorMode = ['hex', 'rgb', 'hsl']

const Props = {
  value: PropTypes.string.isRequired,
  modes: PropTypes.arrayOf(PropTypes.oneOf(ColorMode)),
  mode: PropTypes.oneOf(ColorMode),
  disabled: PropTypes.bool,
  update: PropTypes.func,

  showInspector: PropTypes.bool,
  showSliders: PropTypes.bool,
  showValues: PropTypes.bool,

  showSwatches: PropTypes.bool,
  swatches: PropTypes.array, //PropTypes.SwatchList,
  swatchesLabel: PropTypes.string,
  swatchesTooltip: PropTypes.bool
}


class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.modes = this.props.modes || ColorMode

    this.state = {
      color: new Color(this.props.value || 'red'),
      mode: this.props.mode || this.modes[0],
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

    return (
      <div className='ColorPicker'>
        {this.props.showInspector !== false &&
          <div className={'ColorPicker-board'}>
            <ColorInspector color={this.state.color} update={this.onChange} />
          </div>
        }
        {this.props.showSliders !== false &&
          <div className={'ColorPicker-sliders'}>
            <ColorSliders color={this.state.color} modes={this.modes} mode={this.state.mode} update={this.onChange} />
          </div>
        }
        {this.props.showValues !== false &&
          <div className={'ColorPicker-values'}>
            <ColorValues color={this.state.color} modes={this.modes} mode={this.state.mode} update={this.onChange} />
          </div>
        }
        {this.props.showSwatches !== false && this.props.swatches &&
          <div className={'ColorPicker-swatches'}>
            <ColorSwatches swatches={this.props.swatches} tooltips={this.props.swatchesTooltip} label={this.props.swatchesLabel} update={this.onChange} />
          </div>
        }
      </div>
    )
  }

  onChange = (color, mode) => {
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

ColorPicker.propTypes = Props

export { ColorPicker, ColorMode }
