import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from "react-google-login";
import Slider from 'react-rangeslider';
import styled from 'styled-components';
import 'react-rangeslider/lib/index.css';
import './App.css';

const LoginSplash = styled.div `
    margin: 35vh;
`

const DashboardContainer = styled.div `
    display: grid;  
    grid-gap: 5px;  
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-template-rows: repeat(2, 1fr); 
`
const BudgetSliderDiv = styled.div `
    width: 90%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px 15px;
`

const UserInfo = styled.div `
    padding-top: 20px;
    padding-bottom: 20px;
`

const SliderDetailsDiv = styled.div `
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
`

const ElectionDiv = styled.div `
    width: 95%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-top: 30px;
`

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

class App extends React.Component {
  state = {
      userDetails: {},
      isUserLoggedIn: false,
      sliderValue: 15,
      salary: 0,
      expense: 0,
      savings: 0
  }

  handleSliderChangeStart = () => {
    console.log('Change event started')
  };

  handleSliderChange = sliderValue => {
    let calculatedExpense = (this.state.salary / 12) * (this.state.sliderValue / 100);
    let calculatedSavings = (this.state.salary / 12 ) * (1 - this.state.sliderValue / 100);

    this.setState({
      ...this.state,
      sliderValue: sliderValue,
      expense: calculatedExpense,
      savings: calculatedSavings,
    })
  };

  handleSliderChangeComplete = () => {
    console.log('Change event completed')
  };

  responseGoogle = response => {
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
  };

  logout = () => {
    this.setState({isUserLoggedIn: false})
  };

  handleSalaryChange = (event) => {
    let calculatedExpense = (event.target.value / 12) * (this.state.sliderValue / 100);
    let calculatedSavings = (event.target.value / 12 ) * (1 - this.state.sliderValue / 100);

    this.setState({
      ...this.state,
      salary: parseInt(event.target.value),
      expense: calculatedExpense,
      savings: calculatedSavings
    });
  }
  
  render() {

    return (
      <div className="App">
        {!this.state.isUserLoggedIn && (

          <LoginSplash>
            <GoogleLogin
              clientId="59297034610-76ooi6ps7qm3krp9pt3kb1p57bku8ofb.apps.googleusercontent.com"
              render={renderProps => (
                
                <div>
                  <h5 className="wiggle"><span role="img" aria-label="money">💸</span></h5>
                  <h2>WELCOME TO YOUR BUDGET APP!</h2>
                  <button
                    className="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    >
                    Log in with Google
                  </button>
                </div>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              />
            </LoginSplash>


        )}
        {this.state.isUserLoggedIn && (
          <div className="loggedInWrapper">
            <div className="userDetails-wrapper">
              <div className="details-wrapper">
                

                <div className="image">
                  <img src={this.state.userDetails.imageUrl} alt={this.state.userDetails.name}/>
                </div>
                <GoogleLogout
                  render={renderProps => (
                    <div>
                      <button
                        className="logout-button"
                        onClick={renderProps.onClick}
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                  onLogoutSuccess={this.logout}
                />

                <UserInfo>
                  <div className="name">
                    Welcome {this.state.userDetails.givenName}{" "}
                    {this.state.userDetails.familyName}
                  </div>
                  <div className="email"><i>{this.state.userDetails.email}</i></div>
                </UserInfo>

              </div>
              <div className="bar" />
              <div className="stand" />

              <DashboardContainer>

                <BudgetSliderDiv>
                  <h3>Welcome to your Monthly Budget, {this.state.userDetails.givenName}!</h3>
                <div className='slider'>
                  <Slider
                    min={1}
                    max={30}
                    value={this.state.sliderValue}
                    onChangeStart={this.handleSliderChangeStart}
                    onChange={this.handleSliderChange}
                    onChangeComplete={this.handleSliderChangeComplete}
                    />
                  <div className='value'>{this.state.sliderValue}%</div>
                </div>
                  <SliderDetailsDiv>
                    <h3>Your Salary: {this.state.salary ? formatter.format(parseInt(this.state.salary)) : 0}</h3>
                    <input type="number" value={this.state.salary} onChange={this.handleSalaryChange}></input>
                    <h3>Your Expense: {formatter.format(this.state.expense)}</h3>
                    <h3>Your Savings: {formatter.format(this.state.savings)}</h3>
                  </SliderDetailsDiv>
                </BudgetSliderDiv>

                  <ElectionDiv>
                    <h3> Thanks, {this.state.userDetails.givenName}! Let's review your budget:</h3>
                    <h3> Your Election: {this.state.sliderValue}%</h3>
                    <h3>Your Salary: {this.state.salary ? formatter.format(parseInt(this.state.salary)) : 0}</h3>
                      <h3>Your Expense: {formatter.format(this.state.expense)}</h3>
                      <h3>Your Savings: {formatter.format(this.state.savings)}</h3>
                  </ElectionDiv>

                </DashboardContainer>

            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
