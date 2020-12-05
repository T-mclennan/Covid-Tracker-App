import React from 'react'
import styles from './DynamicChart.module.css';


function SampleChart({title}) {

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
      <div className={styles.chartContainer}> 

            <h1>13,000 cases</h1>

      </div>
    </div>
  )
}

export default SampleChart
