import React from 'react'
import ContactForm from './ContactForm'
import styles from './Pages.module.css'

function Contact() {

  return (
    <>
      <div className={styles.container}>
          {/* <div className={styles.headingBox}>
            <h3>Lorem ipsum dolor sit amet.</h3>
          </div>
          <div className={styles.content}>
            <h5>Please feel free to contact me with thoughts, suggestions or criticism.</h5>
          </div> */}
      </div>

      <div className={styles.formContainer}>
        <ContactForm />
      </div>
    </>
  )
}

export default Contact
