import React from 'react';

import './_weather-results-list.scss';

class WeatherResultList extends React.Component {
  renderWeatherResults = (results) => {
    console.log('RESULTS!', results);
    return (
      <div className='forecast-location'>
        <h1>Showing Forecast for: </h1>
          {results.map((result, index) => {
            return (
              <div key={index}>
                <h1> { this.state.city } { this.state.zipCode } </h1>
                <p>Weather: {result.weather_description}, {result.weather_description} </p>
                <p>temp:</p>
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
          this.props.weatherResults
            ? <div> 
            { this.renderWeatherResults(this.props.weatherResults) }
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
