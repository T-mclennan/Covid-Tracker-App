import React from 'react';
import { OriginalChart, NewCasesChart, MainHeader, Footer } from './components';
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
        <OriginalChart data={data} country={country} />
        {/* <NewCasesChart /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
