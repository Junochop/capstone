import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Login from '../components/Login/Login.js';
import firebase from 'firebase';
import Navbar from '../components/Navbar/Navbar.js';
import AllRecipes from '../components/AllRecipes/AllRecipes.js';
import MyRecipes from '../components/MyRecipes/MyRecipes.js';
import Register from '../components/Register/Register.js';
import Notes from '../components/Notes/Notes.js';
import Update from '../components/Update/Update.js';
import Search from '../components/Search/Search.js';
import SearchedDetail from '../components/SearchedDetail/SearchedDetail.js';
import fbConnection from '../firebaseRequests/connection';
import './App.css';

fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/AllRecipes', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListner = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });

      }
    });
  }

  componentWillUnmount () {
    this.removeListner();
  }

  runAway = () => {
    this.setState({ authed: false });
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
            <div className="container">
              <div className="row">
                <Switch>
                  <PrivateRoute
                    path="/AllRecipes"
                    authed={this.state.authed}
                    component={AllRecipes}
                  />
                  <PrivateRoute
                    path="/MyRecipes"
                    authed={this.state.authed}
                    component={MyRecipes}
                  />
                  <PrivateRoute
                    path="/View/:id"
                    authed={this.state.authed}
                    component={Notes}
                  />
                  <PrivateRoute
                    path="/Update/:id"
                    authed={this.state.authed}
                    component={Update}
                  />
                  <PrivateRoute
                    path="/Search"
                    authed={this.state.authed}
                    component={Search}
                  />
                  <PrivateRoute
                    path="/SearchedDetail/:id"
                    authed={this.state.authed}
                    component={SearchedDetail}
                  />
                  <PublicRoute
                    path="/register"
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PublicRoute
                    path="/login"
                    authed={this.state.authed}
                    component={Login}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
