import './inspector.scss'
import * as React from 'react'
import PropTypes from 'prop-types'
import Color from 'tinycolor2'


//------------------------------------------------------------------------------
// Props

const Props = {
  color: PropTypes.object.isRequired,
  update: PropTypes.func
}

//------------------------------------------------------------------------------

export default
class ColorInspector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      top: (1 - this.props.color.toHsv().v) * 100,
      left: this.props.color.toHsv().s * 100,
      alpha: this.props.color.getAlpha(),
      hsv: this.props.color.toHsv()
    }
  }

  static getDerivedStateFromProps(props, state) {
    const hsv = props.color.toHsv()

    return {
      top: (1 - hsv.v) * 100,
      left: hsv.s * 100,
      hsv
    }
  }


  render() {
    return (
      <div className={'ColorInspector'}
        ref={node => this.elem = node}
        onMouseDown={this.pickerStart}>
        <div className={'ColorInspector-hue'}
          style={{ background: `hsla(${this.state.hsv.h}, 100%, 50%, 1)` }}>
          <div className={'ColorInspector-saturation'} />
          <div className={'ColorInspector-value'} />
        </div>
        <span></span>
        <div className={'ColorInspector-handler'}
          style={{ top: `${this.state.top}%`, left: `${this.state.left}%` }}>
        </div>
      </div>
    )
  }

  pickerStart = (event) => {
    document.addEventListener('mousemove', this.pickerMove)
    document.addEventListener('mouseup', this.pickerEnd)
    this.rect = this.elem.getBoundingClientRect()

    const top = Math.max(Math.min(event.pageY - this.rect.top, 150), 0) / 1.5
    const left = Math.max(Math.min(event.pageX - this.rect.left, 200), 0) / 2

    this.onChange(top, left)
  }

  pickerMove = (event) => {
    const top = Math.max(Math.min(event.pageY - this.rect.top, 150), 0) / 1.5
    const left = Math.max(Math.min(event.pageX - this.rect.left, 200), 0) / 2

    this.onChange(top, left)
  }


  pickerEnd = (event) => {
    document.removeEventListener('mousemove', this.pickerMove)
    document.removeEventListener('mouseup', this.pickerEnd)
  }

  onChange = (top, left) => {
    // hsv calcs here are easier, but hsl lets us maintain alpha
    const newHsv = { h: this.state.hsv.h, s: left / 100, v: 1 - (top / 100) }
    const newColor = Color(newHsv).setAlpha(this.state.alpha).toHsl()

    this.props.update ? this.props.update(newColor) : null
  }
}

ColorInspector.propTypes = Props