import React from 'react'
import ContactForm from './ContactForm'
import styles from './../Pages.module.css'

function Contact() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default Contact
