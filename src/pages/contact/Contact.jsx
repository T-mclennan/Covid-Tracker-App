import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import ContactForm from './ContactForm'
import styles from './Contact.module.css'
import headshot from '../../assets/images/headshot.jpeg'

const {contactContainer, imageBox, infoBox, iconBox, icon, headerBox, title, mainContent, profileContainer, formContainer} = styles

const Contact = () => {
  return (
    <div className={contactContainer}>  
      <div className={headerBox}>
        <h6>Questions? Comments?</h6>
        <h3 className={title}>Send me a message!</h3>
      </div>
      <div className={mainContent}> 
        <div className={profileContainer}>
          <img src={headshot} className={imageBox}></img>
          <div className={infoBox}>
            <h5>Tristan Mclennan</h5>
            <h6>Junior Full-Stack Developer</h6>
            <div className={iconBox}>
            <IconButton aria-label="linkedin" target="_blank"
              rel="noopener noreferrer" href="https://www.linkedin.com/in/t-mclennan/">
              <LinkedInIcon className={icon} style={{fontSize: 30}}/>
            </IconButton>
            <IconButton aria-label="github" target="_blank"
              rel="noopener noreferrer" href="https://github.com/T-mclennan">
              <GitHubIcon className={icon} style={{fontSize: 28}}/>
            </IconButton>
            <IconButton aria-label="facebook" target="_blank"
              rel="noopener noreferrer" href="https://www.facebook.com/tristan.mclennan.1/">
              <FacebookIcon className={icon} style={{fontSize: 30}}/>
            </IconButton>

            </div>
          </div>
        </div>
        <div className={formContainer}>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact
