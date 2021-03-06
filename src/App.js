import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Theme from './util/themes/ThemeProvider';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Importing Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

// Importing Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
// import { AppBar } from '@material-ui/core';

axios.defaults.baseURL = 'https://asia-east2-twitter-ee105.cloudfunctions.net/api';

const token = localStorage.FBIToken;
if(token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser())
		window.location.href = '/login'
	} else {
		store.dispatch({type: SET_AUTHENTICATED});
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}
class App extends Component {
//   constructor(props, context) {
// 		super(props, context);
// 	// 	this.state = {
// 	// 		dark:store.getState().theme.darkMode,
//     // }
//     // this.handleDarkMode = this.handleDarkMode.bind(this);
//    }
//    handleDarkMode = () => {
//      this.setState((state) => ({
//        dark:store.getState().theme.darkMode,
//      }))
//    }
	render() {
		return (
		<Provider store={store}> 
		<Theme>
				<div className="App">
					<Router>
						{/* <Navbar handleDarkMode={this.handleDarkMode}/> */}
						<Navbar >
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute exact path="/login" component={login} />
								<AuthRoute exact path="/signup" component={signup} />
								<Route exact path="/users/:handle" component={user} />
								<Route exact path="/users/:handle/tweet/:tweetId" component={user}/>
							</Switch>	
						</div>
						</Navbar>
					</Router>
				</div>	
        </Theme>
      </Provider>
			);
	}
}

//    App.propTypes = {
//    	theme: PropTypes.object.isRequired,
//    	changedarkMode: PropTypes.func.isRequired,
//      }

//    const mapStateToProps = (state) => ({
//    	theme: state.theme,
//      });
  // connect(mapStateToProps)(App);
export default App