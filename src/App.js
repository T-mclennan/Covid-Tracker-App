import React from 'react';
import {  Navbar, Main } from './components';
import styles from './App.module.css';

class App extends React.Component {

  render() {


    return (
      <div className={styles.container}>
        <Navbar/>
        <Main/>
      </div>
    );
  }
}

export default App;
