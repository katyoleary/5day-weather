import React from 'react';
import superagent from 'superagent';

import SearchForm from '../search-form/search-form';
import WeatherResultsList from '../weather-results-list/weather-results-list';

import request from '../../../request';

import './_dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [], 
      successfulSearch: true,
      city: '',
      zipCode: '',
    };
  }

  componentDidMount = () => {
    if (localStorage.weatherResults) {
      try {
        const weatherResults = JSON.parse(localStorage.weatherResults);
        return this.setState({ forecast: weatherResults, successfulSearch: true });
      } catch (err) {
        return console.error(err);
      }
    } else {
      return null;
    }
  }

  // mockRequest = () => {
  //   console.log(JSON.parse(request));
  //   return JSON.parse(request);
  // }

  // forecastSearch = () => {
  //   const response = this.mockRequest();
  //   console.log(response);
  //   this.setState(() => {
  //     return {
  //       forecast: response.list.map((results) => {
  //         return {
  //           temp: results.main.temp,
  //           temp_min: results.main.temp_min,
  //           temp_max: results.main.temp_max,
  //           humidity: results.main.humidity,
  //           weather_main: results.weather[0].main,
  //           weather_description: results.weather[0].description,
  //           date: results.dt_txt,
  //         };
  //       }).filter(forecast => forecast.date.includes('12:00:00')),
  //     };
  //   });
  // };


  forecastSearch = () => {
    if (this.state.city) {
      return superagent.get(`api.openweathermap.org/data/2.5/forecast?q=${this.state.city},us&units=imperial&APPID=${process.env.APIKEY}`)
        .then((response) => {
          console.log(response);
          this.setState(() => {
            return {
              forecast: response.list.map((results) => {
                return {
                  temp: results.main.temp,
                  temp_min: results.main.temp_min,
                  temp_max: results.main.temp_max,
                  humidity: results.main.humidity,
                  weather_main: results.weather[0].main,
                  weather_description: results.weather[0].description,
                };
              }).filter(forecast => forecast.date.includes('12:00:00')),
            };
          })
          try {
            localStorage.forecast = JSON.stringify(this.state.forecast);
            // this.setState({ forecast: weatherResults, successfulSearch: true });
          } catch (err) {
            this.setState({ forecast: null, successfulSearch: false });
          }
        });
    }
    if (this.state.zipCode) {
      return superagent.get(`api.openweathermap.org/data/2.5/forecast?zip=${this.state.zipCode},us&units=imperial&APPID=${process.env.APIKEY}`)
        .then((response) => {
          console.log(response);
          this.setState(() => {
            return {
              forecast: response.list.map((results) => {
                return {
                  temp: results.main.temp,
                  temp_min: results.main.temp_min,
                  temp_max: results.main.temp_max,
                  humidity: results.main.humidity,
                  weather_main: results.weather[0].main,
                  weather_description: results.weather[0].description,
                };
              }).filter(forecast => forecast.date.includes('12:00:00')),
            };
          })
          try {
            localStorage.forecast = JSON.stringify(this.state.forecast);
            // this.setState({ forecast: weatherResults, successfulSearch: true });
          } catch (err) {
            this.setState({ forecast: null, successfulSearch: false });
          }
        });
    }
  }

  render() {
    return (
      <div>
        <h1>Forecast Search</h1>
        <p>Enter either the city or zip to see the 5 day forecast</p>
        <SearchForm
          forecastSearch={this.forecastSearch.bind(this)}
          searchStatus={this.state.successfulSearch}
          city={this.city}
        />
        { this.state.forecast.length > 0
          ? <WeatherResultsList
            forecast={this.state.forecast}
            city={this.state.city}
            />
          : <div></div>
        }
      </div>
    );
  }
}

export default Dashboard;
