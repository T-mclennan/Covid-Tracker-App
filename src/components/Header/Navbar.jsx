import React, { useState, useCallback } from 'react'
import { HamburgerSliderReverse } from 'react-animated-burgers'
import {Link} from 'react-router-dom'
import history from '../../history';
import logo from './logo.png'
import './Navbar.css';

function Navbar() {

  // const [path, setPath] = useState(window.location.pathname)
  // console.log('Nav: ', path)

  const [isActive, setIsActive] = useState(false)

  const toggleButton = useCallback(
    () => setIsActive(prevState => !prevState),
    [],
  )

  const closeMobileMenu = () => setIsActive(false)

  return (
    <>

{/* SliderReverse */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => history.push(`/`)}>
            <img src={logo}  alt={logo}/>
            SF Covid Dashboard 
          </div>
          <ul className={!isActive ? 'nav-menu': "nav-menu active"}>
          {/* <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
            </li> */}
            <li className="nav-item">
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>About</Link>
            </li>
            <li className="nav-item">
              <Link to='/resources' className='nav-links' onClick={closeMobileMenu}>Resources</Link>
            </li>
            <li className="nav-item">
            <a
              className='nav-links'
              // href={'https://github.com/T-mclennan/Covid-Tracker-App'}
              // id='github'
              // aria-label='github'
              // target="_blank"
              // rel="noopener noreferrer"
              onClick={closeMobileMenu}>Github
            </a>
            </li>
            <li className="nav-item">
              <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>Contact</Link>
            </li>
          </ul>
        {window.innerWidth <= 900 ? 
         <HamburgerSliderReverse
            buttonStyle={burgerStyle}
            buttonWidth={25}
            barColor="white"
            {...{ isActive, toggleButton }}
          />
          : ''}

        </div>
      </nav>
    </>
  )
}

const burgerStyle = {
  position: 'relative',
  right: '1rem',
  outline: 'none'
  
}

export default Navbar
