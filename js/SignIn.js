import React from 'react'
import { Link } from 'react-router'
import 'whatwg-fetch'

const SignIn = React.createClass({

	getInitialState(){
		return {
			connectBtnText: "Connect with Twitter"
		};
	},
	checkStatus(response) {
	  	if (response.status >= 200 && response.status < 300) {
	    	return response
	  	}	 	
	  	else {
		    var error = new Error(response.statusText)
		    error.response = response
		    throw error
		}
	},
	parseJSON(response) {
	  	return response.json()
	},
	handleConnectClick(event) {
		this.setState({connectBtnText: 'Requesting access..'});

		fetch('/twitter/connect')
		.then(this.checkStatus)
		.then(this.parseJSON)
		.then((data) => {
			console.log('request succeeded with JSON response', data);
			this.setState({handleConnectBtnText: 'Redirecting you to Twitter..'});
			window.location = data.redirect_to;
		}).catch((error) => {
			console.log('request failed', error);
			this.setState({handleConnectBtnText: 'Connect with Twitter..'});
		});
	},
  	render () {
	  	
	    return (
	      	<section className="connect">

			    <div className="btn-group">
			      <button onClick={this.handleConnectClick} className="btn btn-default btn-lg" type="button" aria-haspopup="true" aria-expanded="false">
			        {this.state.connectBtnText}
			      </button>
			      
			    </div>
			</section>
	    )
  	}
})

export default SignIn
