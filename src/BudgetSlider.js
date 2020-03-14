import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';


class BudgetSlider extends Component {
  state = {
      sliderValue: 15
    }

  handleSliderChangeStart = () => {
    console.log('Change event started')
  };

  handleSliderChange = value => {
    this.setState({
      sliderValue: value
    })
  };

  handleSliderChangeComplete = () => {
    console.log('Change event completed')
  };

  render () {
    const { sliderValue } = this.state.sliderValue;
    return (
      <div className='slider'>
        <Slider
          min={1}
          max={30}
          value={sliderValue}
          onChangeStart={this.handleSliderChangeStart}
          onChange={this.handleSliderChange}
          onChangeComplete={this.handleSliderChangeComplete}
        />
        <div className='value'>{sliderValue}%</div>
      </div>
    )
  }
}

export default BudgetSlider;