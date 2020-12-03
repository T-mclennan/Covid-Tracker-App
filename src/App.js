import React from 'react';
import {  Navbar, Main, MainFooter } from './components';
import styles from './App.module.css';

class App extends React.Component {

  render() {


    return (
      <div className={styles.container}>
        <Navbar/>
        <Main/>
        <MainFooter />
      </div>
    );
  }
}

export default App;
