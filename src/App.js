import React from 'react';
import { Cards, Charts, CountryPicker, MainHeader, Footer } from './components';
import styles from './App.module.css';
import { fetchData } from './api/index';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData);
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    console.log(fetchData);
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <MainHeader />
        {/* <Cards data={data} /> */}
        {/* <CountryPicker handleCountryChange={this.handleCountryChange} /> */}
        <Charts data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
