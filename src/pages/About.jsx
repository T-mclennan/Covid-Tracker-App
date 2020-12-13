import React, {useContext} from 'react'
// import styles from './Pages.module.css'
// import {ChartContext} from 
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import picture from '../assets/images/sf2.jpg'



function About() {

  //Todo: setup table with data sources


  return (

    <Container maxWidth="lg" style={{height: '90vh', marginTop: '2rem', color: 'white'}}>
        <CardMedia
          component="img"
          alt="San Francisco"
          height={100}
          image={picture}
          title="San Francisco"
        >
        </CardMedia>

      <Typography variant="h5" >Covid-19 Information for San Francisco</Typography>
    
      <Typography variant="h6" >This is a person project meant to help share local information of Coronavirus.</Typography>

      <Typography variant="body1" >The data is sourced from researchers and the local government website: SODA</Typography>


    </Container>


    // <div className={styles.container}>
    //   <section className={styles.hero}>
    //     <div className={styles.container}>
    //       <div className={styles.heading}>
    //         <h1>Covid Tracker</h1>

    //         <h2>If you have symptoms please click here for help</h2>
    //         <h3>The Covid Dashboard displays real time covid information for San Francisco.</h3>
    //         <h3>All the information is currated by SODA</h3>
    //       </div>
    //       <div className={styles.content}>
    //         <h2>Data Sources:</h2>


    //       </div>
    //     </div>
    //   </section>
    // </div>
  )
}

export default About
