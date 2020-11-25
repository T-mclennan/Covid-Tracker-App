import React from 'react';
import { DynamicChart, MainHeader, Footer, Navbar } from './components';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    dataSource: '',
    dataDate: '',
  };

  render() {


    return (
      <div className={styles.container}>
        {/* <MainHeader /> */}
        <Navbar/>
        <DynamicChart category={'SF_CASE_DATA'}/>
        <DynamicChart category={'HOSPITAL_DATA'}/>
        <DynamicChart category={'GENDER_DATA'}/>
        <DynamicChart category={'AGE_DATA'}/>
        <DynamicChart category={'RACE_DATA'}/>
        <DynamicChart category={'MAP_DATA'}/>



        {/* <Footer source={dataSource} date={dataDate} /> */}
      </div>
    );
  }
}

export default App;
