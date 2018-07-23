import './tooltip.scss'
import * as React from 'react'

import PropTypes from 'prop-types'

//------------------------------------------------------------------------------
// Props

const Props = {
  label: PropTypes.string.isRequired,
  placement: PropTypes.string, // 'top' | 'right' | 'bottom' | 'left'
  length: PropTypes.string, // 'micro' | 'small' | 'medium' | 'large' | 'xlarge' | 'fit'
  align: PropTypes.string, // 'left' | 'center' | 'right'
  expiring: PropTypes.bool
}

//------------------------------------------------------------------------------
// Components

export default
class Tooltip extends React.Component {

  render() {
    return (
      <div className={`Tooltip ${this.props.expiring ? 'Tooltip--expiring' : null}`}
        data-tooltip={this.props.label}
        data-tooltip-pos={this.props.placement || 'top'}
        data-tooltip-length={this.props.length || 'fit'}
        data-tooltip-align={this.props.align || 'left'} >
        {this.props.children}
      </div>
    )
  }
}

Tooltip.propTypes = Props
