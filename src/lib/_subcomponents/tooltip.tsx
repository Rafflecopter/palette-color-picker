import './tooltip.scss'
import * as React from 'react'
import cls from '../util/className'


//------------------------------------------------------------------------------
// Types

interface Props {
  label: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  length?: 'micro' | 'small' | 'medium' | 'large' | 'xlarge' | 'fit'
  align?: 'left' | 'center' | 'right'
  expiring?: boolean
}


//------------------------------------------------------------------------------
// Components

export default
class Tooltip extends React.Component<Props> {

  render() {
    const mods = {
      'expiring': this.props.expiring || false
    }

    return (
      <div className={cls(this, mods)}
        data-tooltip={this.props.label}
        data-tooltip-pos={this.props.placement || 'top'}
        data-tooltip-length={this.props.length || 'fit'}
        data-tooltip-align={this.props.align || 'left'} >
        {this.props.children}
      </div>
    )
  }
}

