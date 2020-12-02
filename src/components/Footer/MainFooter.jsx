import React from 'react'
import styles from './MainFooter.module.css'

function MainFooter() {
  return (
    // <div style={FooterStyle}>
    <div className={styles.MainFooter}>
      <p>&#169; 2020 copyright all right reserved</p>
    </div>
  )
}

// const FooterStyle = {
//     height: '4rem',
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: 'linearGradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%)',
//     color: 'whitesmoke'
// }

export default MainFooter
