import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: '',
      zipSearch: '',
    };
  }

  handleCityChange = (e) => {
    this.setState({ citySearch: e.target.value });
  }

  handleZipChange = (e) => {
    this.setState({ zipSearch: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchHandle(this.state.citySearch || this.state.zipSearch);
    this.setState({ citySearch: '', zipSearch: '' });
  }

  render() {
    return (
      <form onSubmit= {this.handleSubmit} className='form-class'>
        <input 
          type='text'
          name='citySearch'
          placeholder='Search a city'
          value={this.state.citySearch}
          onChange={this.handleCityChange} />
        <input 
          type='number'
          name='zipSearch'
          value={this.state.zipSearch}
          onChange={this.handleZipChange} />
        <button type='submit'>Search</button>
      </form>
    );
  }
}

export default SearchForm;
