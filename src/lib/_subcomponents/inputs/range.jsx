import './range.scss'
import * as React from 'react'
import Key from 'mousetrap'
import nanoid from 'nanoid'

import PropTypes from 'prop-types'


//------------------------------------------------------------------------------
// Props

const Props = {
  value: PropTypes.string,
  label: PropTypes.string,
  units: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  disabled: PropTypes.bool,
  update: PropTypes.func
}

//------------------------------------------------------------------------------

export default
class Range extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || '',
    }
  }

  componentDidMount() {
    const key = new Key(this.elem)
    const step = this.props.step || 1
    key.bind(['up', 'right'], () => {this.nudgeValue(1); return false})
    key.bind(['down', 'left'], () => {this.nudgeValue(-1); return false})
    key.bind(['shift+up', 'shift+right'], () => {this.nudgeValue(10); return false})
    key.bind(['shift+down', 'shift+left'], () => {this.nudgeValue(-10); return false})
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
      'is-disabled': this.props.disabled
    }

    return (
      <label className={'Range'}
        ref={node => this.elem = node}>
        <span className={'Range-input'}>
          <input type='range'
            id={nanoid()}
            onChange={this.onUpdate}
            onBlur={this.onUpdate}
            disabled={this.props.disabled}
            step={this.props.step || 1}
            min={this.props.min ? this.props.min : undefined}
            max={this.props.max ? this.props.max : undefined}
            value={this.state.value} />
          {this.props.units &&
            <span className={'Range-units'}>{this.props.units}</span>
          }
        </span>

        {this.props.label &&
          <span className={'Range-label'}>{this.props.label}</span>}
      </label>
    )
  }

  onUpdate = (e) => {
    this.props.update ? this.props.update(e.target.value) : null
  }

  nudgeValue = (increment) => {
    let newVal = Number(this.state.value) + increment
    const units = this.props.units ? this.props.units : ''

    // ensure newVal is in range
    if(this.props.max && newVal > this.props.max) {
      newVal = this.props.max
    }

    if(this.props.min && newVal < this.props.min) {
      newVal = this.props.min
    }
    
    this.setState({value: String(newVal) })
    this.props.update ? this.props.update(this.state.value + units) : null
  }
}


Range.propTypes = Props
