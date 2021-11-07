import React, {useContext} from 'react'
import DynamicChart from './Charts/DynamicChart'
import MapChart from './Charts/MapChart'
import SampleChart from './Charts/SampleChart'
import {ChartContext} from '../context/ChartContext'
import Loader from 'react-loader-spinner'
import styles from './Dashboard.module.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Dashboard() {
  const {data, loaded}= useContext(ChartContext)

  const {
    Hospital_Data, 
    Death_Data, 
    Case_Data, 
    Transmission_Data, 
    Gender_Data, 
    Race_Data, 
    Age_Data, 
    Sexual_Data, 
    SF_Data, 
  } = data;

  return (
    loaded ? <div className={styles.main}>
      <div className={styles.sampleCharts}>
        <SampleChart title={'Total Cases'} data={Case_Data}/>
        <SampleChart title={'Total Deaths'} data={Death_Data}/>
      </div>
      <DynamicChart category={'SF_CASE_DATA'} data={SF_Data}/>
      <DynamicChart category={'HOSPITAL_DATA'} data={Hospital_Data}/>
      <DynamicChart category={'GENDER_DATA'} data={Gender_Data}/>
      <DynamicChart category={'AGE_DATA'} data={Age_Data}/>
      <DynamicChart category={'RACE_DATA'} data={Race_Data}/>
      <DynamicChart category={'SEXUAL_DATA'} data={Sexual_Data}/>
      <DynamicChart category={'TRANSMISSION_DATA'} data={Transmission_Data}/>
    </div> : 
    <div className={styles.loadingScreen}>
      {/* <div style={{margin: 'auto'}}> */}
        <Loader type="ThreeDots" color="white" height={80} width={80} margin="auto"/>
      {/* </div> */}
    </div>
  )
}

export default Dashboard
