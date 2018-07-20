import './text.scss'
import * as React from 'react'
import cls from '../../util/className'
import Key from 'mousetrap'
import nanoid from 'nanoid'


import valueParser from 'postcss-value-parser'
import parseCssDimension from 'parse-css-dimension'


//------------------------------------------------------------------------------
// Props

interface Props {
  value?: string,
  label?: string,
  prefix?: string,
  units?: string,
  fallbackUnits?: string,
  disabled?: boolean,
  update?: Function
}

interface State {
  value: string
  cursorPosition: number
}

//------------------------------------------------------------------------------

export default
  class Text extends React.Component<Props, State> {
  elem: HTMLElement | null
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || '',
      cursorPosition: 0
    }
  }

  componentDidMount() {
    const key = new Key(this.elem!)
    key.bind('up', () => {
      this.nudgeValues(event, 1)
      return false
    })
    key.bind('shift+up', () => {
      this.nudgeValues(event, 10)
      return false
    })
    key.bind('down', () => {
      this.nudgeValues(event, -1)
      return false
    })
    key.bind('shift+down', () => {
      this.nudgeValues(event, -10)
      return false
    })
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
      'is-disabled': this.props.disabled,
      'has-prefix': this.props.prefix ? true : false
    }

    return (
      <label className={cls(this, mods)}
        ref={node => this.elem = node}>
        <div className={cls(this, 'input')}>
          {this.props.prefix &&
            <div className={cls(this, 'prefix')}>
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
            <span className={cls(this, 'units')}>{this.props.units}</span>
          }
        </div>

        {this.props.label &&
          <span className={cls(this, 'label')}>{this.props.label}</span>}
      </label>
    )
  }

  onChange = (e) => {
    const val = e.target.value
    const cursorPos = e.target.selectionStart
    this.setState({ value: val, cursorPosition: cursorPos })
  }

  onBlur = (e) => {
    const vals = this.getParsedValues(e.target.value)

    // this.setState({ value: vals.value})
    this.props.update ? this.props.update(this.state.value) : null
  }

  nudgeValues = (evt, nudge: number) => {
    const vals = this.getParsedValues(this.state.value)
    const selectedValue = this.getSelectedValue(evt, vals)

    vals[selectedValue]['value'] += nudge

    let newThing = ''
    vals.forEach(val => newThing += val['value'] + val['units'])

    this.setState({ value: newThing })
    evt.target.setSelectionRange(vals[selectedValue]['sourceIndex'], vals[selectedValue]['sourceIndex'] + vals[selectedValue]['length'])
  }

  getSelectedValue = (evt, values) => {
    const caretPos = evt.target.selectionStart
    let selectedValue = 0

    for (var i = 0; i < values.length; i++) {
      if (caretPos >= values[i].sourceIndex && caretPos <= values[i].sourceIndex + values[i].length) {
        selectedValue = i
      }
    }

    return selectedValue
  }

  getParsedValues = (values) => {
    const parsedValue = valueParser(values)
    let valStore: Object[] = []

    parsedValue.nodes.forEach(node => {
      valStore.push(node)

      const currentValStore = valStore[valStore.length - 1]
      currentValStore['units'] = ''
      currentValStore['selected'] = false
      currentValStore['length'] = currentValStore['value'].length

      if (node.type == 'word') {
        const cssDimension = parseCssDimension(node.value)
        let cssUnit = ''

        if (cssDimension && cssDimension.unit) {
          cssUnit = cssDimension.unit
        } else if (this.props.fallbackUnits) {
          cssUnit = this.props.fallbackUnits
        }


        currentValStore['value'] = cssDimension.value
        currentValStore['units'] = cssUnit
      } else {

      }
    })

    return valStore
  }
}
