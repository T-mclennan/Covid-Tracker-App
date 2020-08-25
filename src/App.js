import React from 'react';
import { OriginalChart, NewCasesChart, MainHeader, Footer } from './components';
import styles from './App.module.css';
import { fetchSFData } from './api/index';

class App extends React.Component {
  state = {
    dataSource: '',
    dataDate: '',
  };

  render() {
    const setDataSource = (dataSource) => {
      this.setState({ dataSource });
    };

    const setDataDate = (dataDate) => {
      this.setState({ dataDate });
    };

    const { dataDate, dataSource } = this.state;

    return (
      <div className={styles.container}>
        <MainHeader />
        <OriginalChart setSource={setDataSource} setDate={setDataDate} />
        <Footer source={dataSource} date={dataDate} />
      </div>
    );
  }
}

export default App;
