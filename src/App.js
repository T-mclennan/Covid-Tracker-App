import React from 'react';
import { Cards, Charts, CountryPicker } from './components';
import styles from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Cards />
        <Charts />
        <CountryPicker />
      </div>
    );
  }
}

export default App;
