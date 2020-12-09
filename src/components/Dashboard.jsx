import React, {useContext} from 'react'
import DynamicChart from './Charts/DynamicChart'
import SampleChart from './Charts/SampleChart'
import {ChartContext} from '../context/ChartContext'
import Loader from 'react-loader-spinner'

import styles from './Dashboard.module.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Dashboard() {

  const {hospital,sample,sf,gender,race,age, loaded} = useContext(ChartContext)


  return (
    loaded ? <div className={styles.main}>
      <div className={styles.sampleCharts}>
        <SampleChart title={'Total Cases'} data={sample}/>
        <SampleChart title={'Total Deaths'} data={sample}/>
      </div>
      <DynamicChart category={'SF_CASE_DATA'} data={sf}/>
      <DynamicChart category={'HOSPITAL_DATA'} data={hospital}/>
      <DynamicChart category={'GENDER_DATA'} data={gender}/>
      <DynamicChart category={'AGE_DATA'} data={age}/>
      <DynamicChart category={'RACE_DATA'} data={race}/>
      {/* <DynamicChart category={'MAP_DATA'} /> */}
    </div> : 
    <div className={styles.loadingScreen}>
        {/* <Loader type="ThreeDots" color="white" height={80} width={80} /> */}
    </div>
  )
}

export default Dashboard
