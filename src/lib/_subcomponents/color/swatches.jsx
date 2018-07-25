import './swatches.scss'
import * as React from 'react'
import PropTypes from 'prop-types'
import nanoid from 'nanoid'
import Tooltip from '../Tooltip'

//------------------------------------------------------------------------------
// Props

const Props = {
  swatches: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      value: PropTypes.string.isRequired,
      mode: PropTypes.oneOf(['hex', 'rgb', 'hsl'])
    })
  ),
  label: PropTypes.string,
  tooltips: PropTypes.bool,
  update: PropTypes.func
}


//------------------------------------------------------------------------------

export default
class ColorSwatches extends React.Component {

  render() {
    return (
      <React.Fragment>
        {this.props.swatches &&
          <React.Fragment>
            {this.props.label &&
              <span className={'ColorSwatches-label'}>{this.props.label}</span>
            }
            <ul className={'ColorSwatches-vars'}>
              {this.props.swatches.map((swatch) => (
                <li key={nanoid()}>
                  {this.props.tooltips !== false ? (
                    <Tooltip label={swatch.name} length='small' align='center' placement='bottom'>
                      {this.renderSwatch(swatch)}
                    </Tooltip>
                  ) : (
                      <React.Fragment>{this.renderSwatch(swatch)}</React.Fragment>
                    )}
                </li>
              ))}
            </ul>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

  renderSwatch = (swatch) => {
    return (
      <React.Fragment>
        <div className={'ColorSwatches-color'}
          style={{ background: `${swatch.value}` }}
          onClick={() => this.onChange(swatch)}></div>
      </React.Fragment>
    )
  }

  onChange = (swatch) => {
    this.props.update ? this.props.update(swatch.value, swatch.mode) : null
  }
}


ColorSwatches.propTypes = Props
