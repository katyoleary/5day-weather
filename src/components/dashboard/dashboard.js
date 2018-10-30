import './_dashboard.scss';

import React from 'react';
import superagent from 'superagent';

import SearchForm from '../search-form/search-form';
import WeatherResultsList from '../weather-results-list/weather-results-list';

import request from '../../../request';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [], 
      successfulSearch: true,
    };
  }

  componentDidMount = () => {
    if (localStorage.forecast) {
      try {
        return JSON.parse(localStorage.forecast);
      } catch (err) {
        return console.error(err);
      }
    } else {
      return null;
    }
  }

  forecastSearch = (city, zipCode) => {
    if (city) {
      return superagent.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&units=imperial&APPID=${APIKEY}`)
        .then((response) => {
          console.log(response);
          this.setState(() => {
            return {
              forecast: response.body.list.map((results) => {
                return {
                  temp: results.main.temp,
                  temp_min: results.main.temp_min,
                  temp_max: results.main.temp_max,
                  humidity: results.main.humidity,
                  weather_main: results.weather[0].main,
                  weather_description: results.weather[0].description,
                  date: results.dt_txt,
                };
              }).filter(forecast => forecast.date.includes('12:00:00')),
              city: response.body.city.name,
            };
          })
          try {
            localStorage.forecast = JSON.stringify(this.state.forecast);
          } catch (err) {
            console.log(err);
            this.setState({ forecast: null, successfulSearch: false });
          }
        });
    }
    else if (zipCode) {
      return superagent.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&APPID=${APIKEY}`)
        .then((response) => {
          console.log(response);
          this.setState(() => {
            return {
              forecast: response.body.list.map((results) => {
                return {
                  temp: results.main.temp,
                  temp_min: results.main.temp_min,
                  temp_max: results.main.temp_max,
                  humidity: results.main.humidity,
                  weather_main: results.weather[0].main,
                  weather_description: results.weather[0].description,
                  date: results.dt_txt,
                };
              }).filter(forecast => forecast.date.includes('12:00:00')),
              city: response.body.city.name,
            };
          })
          try {
            localStorage.forecast = JSON.stringify(this.state.forecast);
          } catch (err) {
            this.setState({ forecast: null, successfulSearch: false });
          }
        });
    }
  }

  render() {
    return (
      <div>
        <h1 className='weather-header'>Weather App ☼</h1>
        <p className='weather-p'>Enter either a city or zip to see the 5 day forecast</p>
        <SearchForm
          forecastSearch={ this.forecastSearch.bind(this) }
          searchStatus={ this.state.successfulSearch }
          city={ this.state.city }
        />
        { this.state.forecast.length > 0
          ? <WeatherResultsList
            forecast={ this.state.forecast }
            city={ this.state.city }
            />
          : <div></div>
        }
      </div>
    );
  }
}

export default Dashboard;
