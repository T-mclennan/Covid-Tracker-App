import React from 'react'
import styles from './Resources.module.css'
import Popup from './Popup'


function Resources() {

  return (
    <div className={styles.resourceContainer}>
      <div className={styles.listContainer}>
          <div className={styles.headingBox}>
            <h3>Covid-19 Resources</h3>
            <h4>for San Francisco residents:</h4>
          </div>
          {/* https://www.sfcdcp.org/wp-content/uploads/2020/04/GetTestedSF-Eng-052920.pdf */}
          <div className={styles.contentBox}>
          <Popup />
          <ul >
            <li><a href={'https://sf.gov/find-out-about-your-covid-19-testing-options'}> Find testing in San Francisco</a></li>
            <li><a href={'https://www.sfdph.org/dph/alerts/coronavirus.asp'}> San Francisco Health Orders, Press Releases</a></li>
            <li><a href={'https://www.sfcdcp.org/infectious-diseases-a-to-z/coronavirus-2019-novel-coronavirus/coronavirus-2019-businesses/'}> Information for Employers, Businesses, and Employees </a></li>
            <li><a href={'https://www.sfcdcp.org/infectious-diseases-a-to-z/coronavirus-2019-novel-coronavirus/coronavirus-2019-information-for-healthcare-providers/'}> Information for Healthcare Providers</a></li>
            <li><a href={'https://www.sfcdcp.org/health-alerts-emergencies/health-alerts/?wpv-post_tag=2019-ncov&wpv_aux_current_post_id=179&wpv_aux_parent_post_id=179&wpv_view_count=1431'}> SF DPH Health Advisories</a></li>
            <li><a href={'https://covid19.ca.gov/'}> California Covid information</a></li>
          </ul>
          </div>
      </div>
    </div>
  )
}

export default Resources
