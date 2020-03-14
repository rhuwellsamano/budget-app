import React, { useState } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from "react-google-login";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false
    };
  }

  responseGoogle = response => {
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
  };

  logout = () => {
    this.setState({isUserLoggedIn: false})
  };

  render() {
    return (
      <div className="App">
        {!this.state.isUserLoggedIn && (
          <GoogleLogin
            clientId="59297034610-76ooi6ps7qm3krp9pt3kb1p57bku8ofb.apps.googleusercontent.com"
            render={renderProps => (
              <button
                className="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        )}
        {this.state.isUserLoggedIn && (
          <div className="userDetails-wrapper">
            <div className="details-wrapper">
              <GoogleLogout
                render={renderProps => (
                  <button
                    className="logout-button"
                    onClick={renderProps.onClick}
                  >
                    Log Out
                  </button>
                )}
                onLogoutSuccess={this.logout}
              />

              <div className="image">
                <img src={this.state.userDetails.imageUrl} />
              </div>
              <div className="name">
                Welcome Mr. {this.state.userDetails.givenName}{" "}
                {this.state.userDetails.familyName}
              </div>
              <div className="email"><i>{this.state.userDetails.email}</i></div>
            </div>
            <div className="bar" />
            <div className="stand" />
          </div>
        )}
      </div>
    );
  }
}

export default App;
