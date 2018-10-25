import React from 'react';

class SearchResultList extends React.Component {
  renderSearchResults = (results) => {
    console.log('RESULTS!', results);
    return (
      <div className='forecast-location'>
        <h1>Forecast for: { results.city }</h1>
        <p>{ results.list.main }</p>
        {/* <p>{results.clouds}</p>
        <p>{results.wind}</p> */}
      </div>
    );
  }

  render() {
    return (
      <div>
        { 
          this.props.searchResults
            ? <div> 
            { this.renderSearchResults(this.props.searchResults) }
          </div>
            : <div>
            <h2>No Results</h2>
          </div>
        }
      </div>
    );
  }
}

export default SearchResultList;
