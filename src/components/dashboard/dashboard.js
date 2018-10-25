import React from 'react';
// import superagent from 'superagent';

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

  mockRequest = () => {
    console.log(JSON.parse(request));
    return JSON.parse(request);
  }

  forecastSearch = () => {
    const response = this.mockRequest();
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
        }),
      };
    });
  };


  // forecastSearch = () => {
  //   if (this.state.city) {
  //     return superagent.get(`api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&APPID=${process.env.APIKEY}`)
  //       .then((response) => {
  //         const weatherResults = [];
  //         console.log(response);
  //         response.body.map((results) => {
  //           return weatherResults.push({
  //             temp: results.list[0].main.temp,
  //             temp_min: results.list[0].main.temp_min,
  //             temp_max: results.list[0].main.temp_max,
  //             humidity: results.list[0].main.humidity,
  //             weather_main: results.list.weather[0].main,
  //             weather_description: results.list.weather[0].description,
  //           });
  //         });
  //         try {
  //           localStorage.weatherResults = JSON.stringify(weatherResults);
  //           this.setState({ forecast: weatherResults, successfulSearch: true });
  //         } catch (err) {
  //           this.setState({ forecast: null, successfulSearch: false });
  //         }
  //       });
  //   }
  //   if (this.state.zipCode) {
  //     return superagent.get(`api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&APPID=${process.env.APIKEY}`)
  //       .then((response) => {
  //         const weatherResults = [];
  //         response.body.data.city.map((results) => {
  //           return weatherResults.push({
  //             temp: results.list.main.temp,
  //             temp_min: results.list[0].main.temp_min,
  //             temp_max: results.list[0].main.temp_max,
  //             humidity: results.list[0].main.humidity,
  //             weather_main: results.list.weather[0].main,
  //             weather_description: results.list.weather[0].description,
  //           });
  //         });
  //       });
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Forecast Search</h1>
        <p>Enter either the city or zip to see the 5 day forecast</p>
        <SearchForm
          forecastSearch={this.forecastSearch.bind(this)}
          searchStatus={this.state.successfulSearch} />
        { this.state.forecast.length > 0
          ? <WeatherResultsList forecast={this.state.forecast}/>
          : <div></div>
        }
      </div>
    );
  }
}

export default Dashboard;
