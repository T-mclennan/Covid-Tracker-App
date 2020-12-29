import React from 'react'
import styles from './Resources.module.css'
import Popup from './Popup'


function Resources() {

  return (
    <div className={styles.resourceContainer}>
      <div className={styles.listContainer}>
          <div className={styles.headingBox}>
            {/* <h3>Covid-19 Resources</h3> */}
            <h4>San Francisco Covid-19 Resources:</h4>
          </div>

          <div className={styles.contentBox}>
            <Popup />
            <ul >
              <li><a href={'https://sf.gov/find-out-about-your-covid-19-testing-options'} target="_blank" rel="noopener noreferrer"> Find testing in San Francisco</a></li>
              <li><a href={'https://www.sfdph.org/dph/alerts/coronavirus.asp'} target="_blank" rel="noopener noreferrer"> San Francisco Health Orders, Press Releases</a></li>
              <li><a href={'https://www.sfcdcp.org/infectious-diseases-a-to-z/coronavirus-2019-novel-coronavirus/coronavirus-2019-businesses/'} target="_blank" rel="noopener noreferrer"> Information for Employers, Businesses, and Employees </a></li>
              <li><a href={'https://www.sfcdcp.org/infectious-diseases-a-to-z/coronavirus-2019-novel-coronavirus/coronavirus-2019-information-for-healthcare-providers/'} target="_blank" rel="noopener noreferrer"> Information for Healthcare Providers</a></li>
              <li><a href={'https://www.sfcdcp.org/health-alerts-emergencies/health-alerts/?wpv-post_tag=2019-ncov&wpv_aux_current_post_id=179&wpv_aux_parent_post_id=179&wpv_view_count=1431'} target="_blank" rel="noopener noreferrer"> SF DPH Health Advisories</a></li>
              <li><a href={'https://covid19.ca.gov/'} target="_blank" rel="noopener noreferrer"> California Covid information</a></li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default Resources
