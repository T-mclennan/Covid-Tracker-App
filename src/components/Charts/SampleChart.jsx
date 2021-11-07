import React  from 'react'
import styles from './SampleChart.module.css';
import CountUp from 'react-countup';

function SampleChart({title, data}) {
  const {daily, weekly, total} = data

  const inputBar = (<>
    <div className={styles.inputBar}>
      <div className={styles.headerContainer}>
        <h5>{title}</h5>
      </div>
    </div>
    </>)

  return (
    <div className={`${styles.container} ${styles.sample}`}>
      
      {inputBar}
      <div className={styles.sampleContainer}> 
        <h1 className={title === 'Total Cases' ? styles.cases : styles.deaths}>
          <CountUp
                start={0}
                end={total}
                duration={1.5}
                separator={','}
              />
          </h1>
        <div className={styles.footerContent}>
          <h6>+{`${daily}`} today</h6>
          <h6>+{`${weekly}`} this week</h6>
        </div>
      </div>
    </div>
  )
}

export default SampleChart
