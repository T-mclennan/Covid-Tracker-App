import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div
      // style={{ backgroundColor: 'black' }}

      className={styles.Footer}
    >
      <div className='content-box'>
        <h3>Data is sourced from SFData.org </h3>
      </div>
      {/* <div className='content-box'>
        <h3>Links go here </h3>
        </div> */}
    </div>
  );
};

export default Footer;
