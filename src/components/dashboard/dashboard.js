import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../search-form/search-form';
import SearchResults from '../search-results/search-results';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [], 
      successfulSearch: true
    };
  }

  componentDidMount = () => {
    if(localStorage.searchResults) {
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

  forecastSearch(city, zip, countryCode) {
    if(!countryCode) {
      countryCode = us;
    }

    if(city) {
      return superagent.get(`api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}`)
        .then((response) => {
          console.log(response.body.data);
          const searchResults = [];
          response.body.data.city.map
          //PUT MAP DATA HERE ONCE WE KNOW WHAT WE GET FROM API

        })
    }
  }

  render() {
    return(
      <div>
        <h1>Forecast Search</h1>
        <p>Enter either the city or zip that you wish to recieve 5 day weather data for</p>
        //INSERT SEARCHFORM AND SEARCH RESULTS INFORMATION HERE
      </div>
    )
  }
}