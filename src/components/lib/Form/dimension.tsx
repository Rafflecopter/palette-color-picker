import './dimension.scss'
import * as React from 'react'
import cls from '~/util/className'
import Key from 'mousetrap'
import nanoid from 'nanoid'


//------------------------------------------------------------------------------
// Props

interface Props {
  value?: string
  label?: string
  units?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  update?: Function
}

interface State {
  value: string
}

//------------------------------------------------------------------------------

export default
class Dimension extends React.Component<Props, State> {
  elem: HTMLElement | null
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || '',
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

  componentDidMount() {
    const key = new Key(this.elem!)
    const step = this.props.step || 1
    
    key.bind('up', () => {this.nudgeValue(step); return false})
    key.bind('down', () => {this.nudgeValue(-step); return false})
    key.bind('shift+up', () => {this.nudgeValue(step * 10); return false})
    key.bind('shift+down', () => {this.nudgeValue(step * -10); return false})
  }

  render() {
    const id = nanoid()
    const mods = {
      'is-disabled': this.props.disabled
    }

    return (
      <label className={cls(this, mods)}
        ref={node => this.elem = node}>
        <span className={cls(this, 'input')}>
          <input type='number'
            id={id}
            onChange={this.handleChange}
            onBlur={this.handleChange}
            disabled={this.props.disabled}
            step={this.props.step || 1}
            min={this.props.min ? this.props.min : undefined}
            max={this.props.max ? this.props.max : undefined}
            value={this.state.value} />
          {this.props.units &&
            <span className={cls(this, 'units')}>{this.props.units}</span>
          }
        </span>

        {this.props.label &&
          <span className={cls(this, 'label')}>{this.props.label}</span>}
      </label>
    )
  }

  handleChange = (e) => {
    const units = this.props.units ? this.props.units : ''

    this.props.update ? this.props.update(e.target.value + units) : null
  }

  nudgeValue = (increment: number) => {
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
