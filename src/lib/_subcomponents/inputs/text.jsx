import './text.scss'
import * as React from 'react'
import nanoid from 'nanoid'

import valueParser from 'postcss-value-parser'
import parseCssDimension from 'parse-css-dimension'


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
  class Text extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || '',
      cursorPosition: 0
    }
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
      <label className={`Text ${this.props.prefix ? 'Text--has-prefix' : ''}`}
        ref={node => this.elem = node}>
        <div className={'Text-input'}>
          {this.props.prefix &&
            <div className={'Text-prefix'}>
              {this.props.prefix}
            </div>
          }
          <input type={`${this.props.units ? 'number' : 'text'}`}
            id={nanoid()}
            onChange={this.onChange}
            onBlur={this.onBlur}
            disabled={this.props.disabled}
            value={this.state.value} />
          {this.props.units &&
            <span className={'Text-units'}>{this.props.units}</span>
          }
        </div>

        {this.props.label &&
          <span className={'Text-label'}>{this.props.label}</span>}
      </label>
    )
  }

  onChange = (e) => {
    const val = e.target.value
    const cursorPos = e.target.selectionStart
    this.setState({ value: val, cursorPosition: cursorPos })
  }

  onBlur = (e) => {
    this.props.update ? this.props.update(this.state.value) : null
  }

}

Text.propTypes = Props