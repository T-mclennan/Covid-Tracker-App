import React, {useState, useLayoutEffect} from 'react'
import DynamicChart from './Charts/DynamicChart'
import SampleChart from './Charts/SampleChart'
import Loader from 'react-loader-spinner'
import {generateData} from '../api/'

import styles from './Dashboard.module.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Dashboard() {

  const [hospitalData, setHospitalData] = useState({})
  const [sampleData, setSampleData] = useState({})
  const [sfData, setSfData] = useState({})
  const [genderData, setGenderData] = useState({})
  const [raceData, setRaceData] = useState({})
  const [ageData, setAgeData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    console.log('Dashboard Data')
    const fetchAPI = async () => {
      const {hospital,sample,sf,gender,race,age} = await generateData()
      setHospitalData(hospital)
      setSampleData(sample)
      setSfData(sf)
      setGenderData(gender)
      setRaceData(race)
      setAgeData(age)
      setLoaded(true)
    };
    fetchAPI();
  }, []);

  return (
    loaded ? <div className={styles.main}>
      <div className={styles.sampleCharts}>
        <SampleChart title={'Total Cases'} data={sampleData}/>
        <SampleChart title={'Total Deaths'} data={sampleData}/>
      </div>

        <DynamicChart category={'SF_CASE_DATA'} data={sfData}/>
        <DynamicChart category={'HOSPITAL_DATA'} data={hospitalData}/>
        <DynamicChart category={'GENDER_DATA'} data={genderData}/>
        <DynamicChart category={'AGE_DATA'} data={ageData}/>
        <DynamicChart category={'RACE_DATA'} data={raceData}/>
        {/* <DynamicChart category={'MAP_DATA'} /> */}
    </div> : 
    <div className={styles.loadingScreen}>
	      {/* <Loader type="ThreeDots" color="white" height={80} width={80} /> */}
    </div>
  )
}

export default Dashboard
