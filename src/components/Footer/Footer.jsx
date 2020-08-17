import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div
      // style={{ backgroundColor: 'black' }}

      className={styles.Footer}
    >
      <div className='content-box'>
        <p>Data is sourced from SFData.org </p>
      </div>
      <div className='content-box'>
        <p>Links go here </p>
      </div>
    </div>
  );
};

export default Footer;
