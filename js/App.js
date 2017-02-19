import React from 'react'
import { render } from 'react-dom'
// import { BrowserRouter, Match } from 'react-router'

import '../public/style.scss'

const App = React.createClass({
  render () {
    return (
      
        <div className='app'>
          <h1>Project started</h1>
        </div>
      
    )
  }
})

render(<App />, document.getElementById('app'))
