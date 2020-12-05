import React from 'react'
import styles from './DynamicChart.module.css';


const inputBar = (<>
<div className={styles.inputBar}>
  <div className={styles.headerContainer}>
    <h5>Title</h5>
  </div>
</div>
</>)

function SampleChart() {
  return (
    <div className={`${styles.container} ${styles.sample}`}>
      
      {inputBar}
      <div className={styles.chartContainer}> 
        <div className={{display: 'inline-block', backgroundColor: 'red', padding: '2rem', width: '100%', height: '30rem'}} >
            <h1>Dat</h1>
        </div>
      </div>
    </div>
  )
}

export default SampleChart
