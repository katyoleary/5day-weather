import React from 'react';
// import superagent from 'superagent';

import './_search-form.scss';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    const emptyState = {
      city: '',
      zipCode: '',
    }

    this.state = emptyState;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.forecastSearch(this.state.city, this.state.zipCode);
    this.setState({ city: '', zipCode: '' });
  };

  render() {
    return (
      <form onSubmit= { this.handleSubmit } className='form-class'>
        <input 
          type='text'
          name='city'
          placeholder='Search by city'
          value={ this.state.city }
          onChange={ this.handleChange } />
         or
        <input 
          type='number'
          name='zipCode'
          placeholder='Search by zip'
          value={ this.state.zipCode }
          onChange={ this.handleChange } />
        <button type='submit'>Search</button>
      </form>
    );
  }
}

export default SearchForm;
