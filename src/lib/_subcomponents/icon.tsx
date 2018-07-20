import './icon.scss'

import * as React from 'react'
import ReactSVG from 'react-svg'

//------------------------------------------------------------------------------
// Props

interface Props {
  name: string,
  width?: string,
  height?: string,
  color?: string,
}

//------------------------------------------------------------------------------

export default
class Icon extends React.Component<Props> {

  render() {
    const styles = {
      width: this.props.width,
      height: this.props.height,
      fill: this.props.color,
    }

    if(this.props.name === '') {
      return ('')
    }

    return (
      <ReactSVG path={`svg/${this.props.name}.svg`} 
      className={`icon icon--${this.props.name}`} 
      wrapperClassName={`icon-wrapper icon-wrapper--${this.props.name}`} 
      style={styles} />
    )
  }
}
