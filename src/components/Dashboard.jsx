import React from 'react'
import styles from './Dashboard.module.css'
import DynamicChart from './Charts/DynamicChart'


function Dashboard() {
  return (
    // <div className={isMobile ? styles.main : `${styles.desktop} ${styles.main}`}>
    <div className={styles.main}>
        <DynamicChart category={'SF_CASE_DATA'}/>
        <DynamicChart category={'HOSPITAL_DATA'}/>
        <DynamicChart category={'HOSPITAL_DATA'}/>
        <DynamicChart category={'GENDER_DATA'}/>
        <DynamicChart category={'AGE_DATA'}/>
        <DynamicChart category={'RACE_DATA'}/>
        <DynamicChart category={'MAP_DATA'}/>
    </div>
  )
}

export default Dashboard
