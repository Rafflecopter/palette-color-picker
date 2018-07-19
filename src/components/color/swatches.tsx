import './swatches.scss'
import * as React from 'react'
import cls from '~/util/className'
import nanoid from 'nanoid'
import Color from 'tinycolor2'

import Tooltip from '~/components/lib/Tooltip'


//------------------------------------------------------------------------------
// Props

interface Props {
  swatches: SwatchList
  label?: string
  update?: Function
}

export type ColorSwatch = {
  name: string,
  value: string,
  mode: 'hex' | 'rgb' | 'hsl'
}

export type SwatchList = ColorSwatch[]

//------------------------------------------------------------------------------

export
  class ColorSwatches extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        {this.props.swatches &&
          <React.Fragment>
            {this.props.label &&
              <span className={cls(this, 'label')}>{this.props.label}</span>
            }
            <ul className={cls(this, 'vars')}>
              {this.props.swatches.map((swatch) => (
                <li key={nanoid()}>
                  <Tooltip label={swatch.name} length='small' align='center' placement='bottom'>
                    <div className={cls(this, 'color')}
                      style={{ background: `${swatch.value}` }}
                      onClick={() => this.onChange(swatch)}></div>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

  onChange = (swatch) => {
    this.props.update ? this.props.update(swatch.value, swatch.mode) : null
  }
}