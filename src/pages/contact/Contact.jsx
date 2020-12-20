import React from 'react'
import ContactForm from './ContactForm'
import styles from './../Pages.module.css'

const {pageContainer, title, mainContent, profileContainer, formContainer} = styles

const Contact = () => {
  return (
    <>
      <div className={pageContainer}>
        <h3 className={title}>Questions or comments?</h3>
        <div className={mainContent}> 
          <div className={profileContainer}>

          </div>
        
          <div className={formContainer}>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
