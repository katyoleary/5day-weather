import React from 'react';
// import dateFormat from 'date-format';

import './_weather-results-list.scss';

class WeatherResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderWeatherResults = () => {
    return (

      <div className='forecast-location'>
        <h1>Showing the 5 day weather forecast for {this.props.city} </h1>
          {this.props.forecast.map((result, index) => {
            return (
              <div className='forecast-result' key={index}>
                <p>Weather: {result.weather_main} ({result.weather_description}) </p>
                <p>Temp: {result.temp}</p>
                <p>High/Low: {result.temp_max}/{result.temp_min}</p>
                <p>Humidity: {result.humidity} </p>
              </div>
            ); 
          })} 
      </div>
    );
  }

  render() {
    return (
      <div>
        { 
          this.props.forecast
            ? <div> 
            { this.renderWeatherResults(this.props.forecast) }
          </div>
            : <div>
            <h2>No Results</h2>
          </div>
        }
      </div>
    );
  }
}

export default WeatherResultList;
