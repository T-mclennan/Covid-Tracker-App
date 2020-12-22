import React from 'react'
import ContactForm from './ContactForm'
import styles from './../Pages.module.css'

const {pageContainer, title, mainContent, profileContainer, formContainer} = styles

const Contact = () => {
  return (
    <>
        <h3 className={title}>Questions or comments?</h3>
        <div className={mainContent}> 
            <div className={profileContainer}>
              PROFILE
            </div>
          { window.innerWidth <= 1000 && <hr style={{backgroundColor: 'white', width: '90%'}}/>}
          <div className={formContainer}>
            <ContactForm />
          </div>
        </div>
    </>
  )
}

export default Contact
