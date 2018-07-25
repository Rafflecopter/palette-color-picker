import './sliders.scss'
import * as React from 'react'
import PropTypes from 'prop-types'
import Range from '../inputs/range'


//------------------------------------------------------------------------------
// Props

const Props = {
  color: PropTypes.object.isRequired,
  mode: PropTypes.string,
  update: PropTypes.func
}

//------------------------------------------------------------------------------

export default
class ColorSliders extends React.Component {

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
        <div className={'ColorSliders-sliders'}>
          <div className={'ColorSliders-slider-hue'}>
            <Range min={0} max={360} value={String(this.state.hsl.h)} update={this.changeHueSlider} />
          </div>
          <div className={'ColorSliders-slider-alpha'}>
            <div className={'ColorSliders-slider-alphaGradient'}
              style={{ background: `linear-gradient(to right, hsla(${this.state.hsl.h}, ${this.state.hsl.s * 100}%, ${this.state.hsl.l * 100}%, 0), hsl(${this.state.hsl.h}, ${this.state.hsl.s * 100}%, ${this.state.hsl.l * 100}%))` }}></div>
            <Range min={0} max={100} value={String(this.state.hsl.a * 100)} update={this.changeAlphaSlider} />
          </div>
        </div>
        <div className={'ColorSliders-preview'}
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


ColorSliders.propTypes = Props
