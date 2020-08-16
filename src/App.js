import React from 'react';
import { Charts, MainHeader, Footer } from './components';
import styles from './App.module.css';
import { fetchSFData } from './api/index';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchSFData();
    this.setState({ data: fetchedData });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <MainHeader />
        <Charts data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
