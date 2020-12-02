import React from 'react'
import styles from './Dashboard.module.css'
import DynamicChart from './Charts/DynamicChart'
import MainFooter from './Footer/MainFooter'

function Dashboard() {
  return (
    <div className={styles.main}>
        <DynamicChart category={'SF_CASE_DATA'}/>
        <DynamicChart category={'HOSPITAL_DATA'}/>
        <DynamicChart category={'GENDER_DATA'}/>
        <DynamicChart category={'AGE_DATA'}/>
        <DynamicChart category={'RACE_DATA'}/>
        <DynamicChart category={'MAP_DATA'}/>
        <MainFooter />
    </div>
  )
}

export default Dashboard
