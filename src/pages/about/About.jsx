import React, {useContext} from 'react'
import styles from '../Pages.module.css'
import CustomTable from './CustomTable'
import {ChartContext} from '../../context/ChartContext'

function About() {

  // const {hospital,sample,sf,gender,race,age,loaded, map} = useContext(ChartContext)
  const chartData = useContext(ChartContext)

  return (

    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.pageContainer}>
          <div className={styles.heading}>
          <h4>About the project:</h4>
            <p>The SF Covid Dashboard provides a visualization of local Covid-19 data.
              The data is sourced real-time from <a target="_blank" rel="noopener noreferrer" href={'https://datasf.org/'}>DataSF</a> and <a target="_blank" rel="noopener noreferrer" href={'https://dev.socrata.com/'}>Socrata</a>, 
              which aggregate information from government entities and non-profit researchers. 
            </p>
            <p>
              Due to the nature of data reporting, a three day buffer is added to processing of the data to prevent depiction of incomplete or underreported information.
            </p>

            <p>
              Future releases will add the use of a dedicated server for processing and caching data between requests, as well as server-side rendering of the webpage. 
              This should improve performance and load time, especially on mobile devices. 
              I also have a neighborhood heatmap developed but haven't found a performant way to get it into production.
            </p>
            <h4>About the Data:</h4>
            <p>More information on how the data was a gathered, what methodologies were used, and other details can be found in the source link for each dataset.</p>
          </div>

          <div className={styles.tableContainer}>
          {chartData.Hospital_Data && <CustomTable data={chartData}/>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
