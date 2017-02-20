import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match } from 'react-router'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import '../public/style.scss'

const App = React.createClass({

	getInitialState(){
		return {
	      screen_name: ''
	    }
	},

    render () {
    	return (  
    		<BrowserRouter>
		        <div className='app'>

		        	<nav className="navbar navbar-inverse"> 
					    <div className="container-fluid"> 
					        <div className="navbar-header"> 
					            
					            <a href="#" className="navbar-brand">Twitter Dashboard</a> 
					        </div> 
					        {this.state.screen_name != '' && <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-5"> <p className="navbar-text navbar-right">Signed in as <a href="#" className="navbar-link">{this.state.screen_name}</a></p> 
					        </div>} 
					    </div> 
					</nav>

		           	<Match exactly pattern='/' component={SignIn} />
		          	<Match pattern='/dashboard' component={Dashboard} />
		        </div>
		    </BrowserRouter>
	    )
  	}
})

render(<App />, document.getElementById('app'))
