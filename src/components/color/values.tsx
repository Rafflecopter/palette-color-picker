import './values.scss'
import * as React from 'react'
import cls from '~/util/className'

import Color from 'tinycolor2'

import Dimension from '~/components/lib/Form/dimension'
import Text from '~/components/lib/Form/text'
import Icon from '~/components/lib/Icon'

import {ColorMode} from '~/components/color'



//------------------------------------------------------------------------------
// Props

interface Props {
  color: Color
  mode: ColorMode
  modes: ColorMode[]
  update?: Function
}

//------------------------------------------------------------------------------

export default
class ColorValues extends React.Component<Props> {

  render() {
    const mods = { mode: this.props.mode.toString() }

    return (
      <React.Fragment>
        <div className={cls(this, 'inputs', mods)}>
          {this.renderInputs(this.props.mode)}
        </div>
        <div className={cls(this, 'mode')}
          onClick={this.changeMode}>
          <Icon name='resize-vertical' />
        </div>
      </React.Fragment>
    )
  }

  renderInputs = (mode) => {
    switch (mode) {
      case 'rgb':
        const rgba = this.props.color.toRgb()
        return (
          <React.Fragment>
            <Dimension label='R' value={`${rgba.r}`} min={0} max={255} update={(event) => this.changeInput(event, 'r')} />
            <Dimension label='G' value={`${rgba.g}`} min={0} max={255} update={(event) => this.changeInput(event, 'g')} />
            <Dimension label='B' value={`${rgba.b}`} min={0} max={255} update={(event) => this.changeInput(event, 'b')} />
            <Dimension label='A' value={`${rgba.a}`} min={0} max={100} update={(event) => this.changeInput(event, 'a')} />
          </React.Fragment>
        )
      case 'hsl':
        const hsla = this.props.color.toHsl()
        return (
          <React.Fragment>
            <Dimension label='H' value={`${Math.round(hsla.h)}`} min={0} max={360} step={1} update={(event) => this.changeInput(event, 'h')} />
            <Dimension label='S (%)' value={`${Math.round(hsla.s * 100)}`} min={0} max={100} update={(event) => this.changeInput(event, 's')} />
            <Dimension label='L (%)' value={`${Math.round(hsla.l * 100)}`} min={0} max={100} update={(event) => this.changeInput(event, 'l')} />
            <Dimension label='A' value={`${hsla.a}`} min={0} max={1} step={0.01} update={(event) => this.changeInput(event, 'a')} />
          </React.Fragment>
        )
      case 'hex':
      case 'hex8':
      case 'name':
        const hasTransparency = this.props.color.toRgb().a < 1 ? true : false
        const whichHexType = hasTransparency ? this.props.color.toHex8() : this.props.color.toHex()
        return (
          <React.Fragment>
            <Text label='HEX' value={`${whichHexType}`} prefix={mode !== 'name' ? '#' : undefined} />
          </React.Fragment>
        )
    }
  }

  changeInput = (value, prop) => {
    let color = this.props.color
    const newColor = () => {
      switch (this.props.mode.toString()) {
        case 'rgb':
          color = color.toRgb()
          color[prop] = Number(value)
          return (color)
        case 'hsl':
          color = color.toHsl()
          color[prop] = Number(value)
          return (color)
        case 'hex':
        default:
          return (color)
      }
    }

    this.props.update ? this.props.update(newColor()) : null
  }

  changeMode = (evt) => {

    let newMode: ColorMode
    const i = this.props.modes.indexOf(this.props.mode)

    if ((i > -1) && (i < this.props.modes.length - 1)) {
      newMode = this.props.modes[i + 1]
    } else {
      newMode = this.props.modes[0]
    }

    this.props.update ? this.props.update(this.props.color, newMode) : null
  }
}