import './sliders.scss'
import * as React from 'react'
import cls from '~/util/className'

import Color from 'tinycolor2'

import Range from '~/components/lib/Form/range'

import { ColorMode } from '~/components/color'


//------------------------------------------------------------------------------
// Props

interface Props {
  color: Color
  mode: ColorMode
  modes: ColorMode[]
  update?: Function
}

interface State {
  hsl: {
    h: string
    s: number
    l: number
    a: number
  }
}

//------------------------------------------------------------------------------

export default
  class ColorSliders extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      hsl: this.props.color.toHsl()
    }
  }

  static getDerivedStateFromProps(props, state) {
    const propsHsl = props.color.toHsl()
    if (propsHsl !== state.hsl) {
      return {
        hsl: propsHsl
      }
    }

    return null
  }

  render() {
    return (
      <React.Fragment>
        <div className={cls(this, 'sliders')}>
          <div className={cls(this, 'slider-hue')}>
            <Range min={0} max={360} value={String(this.state.hsl.h)} update={this.changeHueSlider} />
          </div>
          <div className={cls(this, 'slider-alpha')}>
            <div className={cls(this, 'slider-alphaGradient')}
              style={{background: `linear-gradient(to right, hsla(${this.state.hsl.h}, ${this.state.hsl.s * 100}%, ${this.state.hsl.l * 100}%, 0), hsl(${this.state.hsl.h}, ${this.state.hsl.s * 100}%, ${this.state.hsl.l * 100}%))` }}></div>
            <Range min={0} max={100} value={String(this.state.hsl.a * 100)} update={this.changeAlphaSlider} />
          </div>
        </div>
        <div className={cls(this, 'preview')}
          style={{ backgroundColor: `hsla(${this.state.hsl.h}, ${this.state.hsl.s * 100}%, ${this.state.hsl.l * 100}%, ${this.state.hsl.a} )` }} />
      </React.Fragment>
    )
  }

  changeHueSlider = (hue) => {
    const newColor = `hsla(${hue}, ${this.state.hsl.s}, ${this.state.hsl.l}, ${this.state.hsl.a})`
    this.props.update ? this.props.update(newColor) : null
  }

  changeAlphaSlider = (alpha) => {
    const newColor = `hsla(${this.state.hsl.h}, ${this.state.hsl.s}, ${this.state.hsl.l}, ${alpha / 100})`
    this.props.update ? this.props.update(newColor) : null
  }
}
