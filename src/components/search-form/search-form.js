import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      zipCode: '',
    };
  }

  handleCityChange = (e) => {
    this.setState({ city: e.target.value });
  }

  handleZipChange = (e) => {
    this.setState({ zipCode: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('STATE', this.state);
    // console.log('PROPS', this.props);
    this.props.forecastSearch(this.state.city || this.state.zipCode);
    this.setState({ city: '', zipCode: '' });
  }

  render() {
    return (
      <form onSubmit= {this.handleSubmit} className='form-class'>
        <input 
          type='text'
          name='citySearch'
          placeholder='Search by city'
          value={this.state.city}
          onChange={this.handleCityChange} />
        <input 
          type='number'
          name='zipSearch'
          placeholder='Search by zip'
          value={this.state.zipCode}
          onChange={this.handleZipChange} />
        <button type='submit'>Search</button>
      </form>
    );
  }
}

export default SearchForm;
