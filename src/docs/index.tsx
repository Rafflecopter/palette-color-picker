import '~/lib/style/reset.scss'

import React from 'react'
import { render } from 'react-dom'
import { ColorPicker } from '~/lib'
import { SwatchList } from '~/lib/_subcomponents/color/swatches'

interface Props { }

interface State {
  colorString: string
}

class Demo extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      colorString: '#ff9800'
    }
  }

  render() {
    let swatches: SwatchList = [
      {
        name: '$black',
        value: '#141516',
        mode: 'hex'
      },
      {
        name: '$grey-ghost',
        value: '#f0f2f4',
        mode: 'hex'
      },
      {
        name: 'some orange',
        value: '#FF9800',
        mode: 'hex'
      },
      {
        name: '$blue',
        value: '#0095ff99',
        mode: 'hex'
      },
      {
        name: 'cornflower blue',
        value: 'cornflowerblue',
        mode: 'hex'
      },
      {
        name: 'an rgba bluegreen',
        value: 'rgb(75, 171, 193, 0.75)',
        mode: 'rgb'
      },
      {
        name: 'some purpley pink',
        value: 'hsl(300, 76%, 72%, 0.67)',
        mode: 'hsl'
      },
    ]

    return (
      <React.Fragment>
        <div style={{ width: '250px', margin: '50px', padding: '20px', border: '1px solid gainsboro' }}>
          <ColorPicker defaultColorValue={this.state.colorString} swatches={swatches} update={this.updateColor} swatchesLabel={'Some Colors'} />
        </div>

        <div style={{}}>
          <span style={{ display: 'block', width: '20px', height: '20px', background: `${this.state.colorString}` }} />
        </div>
      </React.Fragment>
    )
  }

  updateColor = (e) => {
    console.log('color:', e)
    this.setState({ colorString: e })
  }
}

render(<Demo />, document.getElementById('app'))
