import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ date, source }) => {
  const footerContent = source ? (
    <>
      <div style={contentBox}>
        <div>
          {/* Data is sourced from: */}
          <a
            href={source}
            target='_blank'
            rel='noopener noreferrer'
            style={{ marginLeft: '5px' }}
          >
            {/* {source} */}
            Data Source
          </a>
        </div>
      </div>
      <div style={contentBox}>
        <div className='footer-content'>Last updated: {date} </div>
      </div>
    </>
  ) : null;
  return <div className={styles.Footer}> {footerContent}</div>;
};

export default Footer;

const contentBox = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
