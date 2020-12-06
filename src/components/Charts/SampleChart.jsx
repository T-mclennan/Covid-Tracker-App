import React, {useState, useLayoutEffect} from 'react'
import styles from './SampleChart.module.css';
import CountUp from 'react-countup';
import { fetchData } from './utils';


function SampleChart({title}) {
  const [content, setContent] = useState(0)

  useLayoutEffect(() => {
    const fetchAPI = async () => {
      const {cases, deaths} = await fetchData('SAMPLE_DATA');
      // setContent( title === 'Total Cases' ? `${cases} Cases` : `${deaths} Deaths`)
      setContent( title === 'Total Cases' ? cases : deaths)

    };

    fetchAPI();
  }, [title]);

  const inputBar = (<>
    <div className={styles.inputBar}>
      <div className={styles.headerContainer}>
        <h2>{title}</h2>
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
                end={content}
                duration={1.5}
                separator={','}
              />
          </h1>
        <h5>+3% this week</h5>
      </div>
    </div>
  )
}

export default SampleChart
