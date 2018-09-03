import React, { Component } from 'react'
import Profile from './components/Profile'
import Header from './components/Header'
import {Home} from './components/Home'
import LoginOrSignup from "./components/LoginOrSignup"
import { BrowserRouter, Route ,Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: false,
    }
    this.isAuthenticate = this.isAuthenticate.bind(this);
    this.WrappedLogin = this.WrappedLogin.bind(this);
    this.WrappedSignUp = this.WrappedSignUp.bind(this)
  }

  isAuthenticate(auth) {
    this.setState({ authenticate: auth });
  }
 
  WrappedLogin() {
    return (<LoginOrSignup  register = 'Login' 
                            authenticate = {this.state.authenticate}
                            isAuthenticate = {this.isAuthenticate}
                            urlFetch = '/api/user/login' />
  );
  };
  WrappedSignUp() {
    return (<LoginOrSignup  register = 'Sign up'
                            authenticate = {this.state.authenticate}
                            isAuthenticate = {this.isAuthenticate}
                            urlFetch = '/api/user/signup' />);
  };
  render() {
    return (

      <BrowserRouter>
        <div>
          <Header authenticate={this.state.authenticate} isAuthenticate={this.isAuthenticate}/>
          <Switch>
            <Route exact path="/"  component={Home} />          
            <Route exact path='/signup' component={this.WrappedSignUp} />
            {this.state.authenticate ?           
              <Route component={Profile} />          
              :
              <Route component={this.WrappedLogin} />
            }      
        </Switch>
        </div>
      </BrowserRouter>


    )
  }
};


export default App;
