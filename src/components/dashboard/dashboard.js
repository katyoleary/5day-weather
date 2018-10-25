import React from 'react';
import superagent from 'superagent';

import SearchForm from '../search-form/search-form';
import SearchResultsList from '../search-results-list/search-results-list';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [], 
      successfulSearch: true,
    };
  }

  componentDidMount = () => {
    if (localStorage.searchResults) {
      try {
        const searchResults = JSON.parse(localStorage.searchResults);
        return this.setState({ forecast: searchResults, successfulSearch: true });
      } catch (err) {
        return console.error(err);
      }
    } else {
      return null;
    }
  }

  forecastSearch = (city, zipCode, countryCode) => {
    if (!countryCode) {
      countryCode = us;
    }

    if (city) {
      return superagent.get(`api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&APPID=${process.env.APIKEY}`)
        .then((response) => {
          console.log(response.body.data);
          const searchResults = [];
          response.body.data.city.map((results) => {
            return searchResults.push({
              temp: results.list.main.temp, 
              temp_min: results.list[0].main.temp_min,
              temp_max: results.list[0].main.temp_max, 
              humidity: results.list[0].main.humidity,
              weather_main: results.list.weather[0].main, 
              weather_description: results.list.weather[0].description,
            });
          });
          try {
            localStorage.searchResults = JSON.stringify(searchResults);
            this.setState({ forecast: searchResults, successfulSearch: true });
          } catch (err) {
            console.log(err);
            this.setState({ forecast: null, successfulSearch: false });
          }
        });
    }
    if (zipCode) {
      return superagent.get(`api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&APPID=${process.env.APIKEY}`)
        .then((response) => {
          console.log(response.body.data);
          const searchResults = [];
          response.body.data.city.map((results) => {
            return searchResults.push({
              temp: results.list.main.temp, 
              temp_min: results.list[0].main.temp_min,
              temp_max: results.list[0].main.temp_max, 
              humidity: results.list[0].main.humidity,
              weather_main: results.list.weather[0].main, 
              weather_description: results.list.weather[0].description,
            });
          });
        });
    }
  }

  render() {
    return (
      <div>
        <h1>Forecast Search</h1>
        <p>Enter either the city or zip that you wish to recieve 5 day weather data for</p>
        <SearchForm searchHandle={this.forecastSearch} searchStatus={this.state.successfulSearch} />
        <SearchResultsList searchResults={this.state.forecast}/>
      </div>
    );
  }
}

export default Dashboard;
