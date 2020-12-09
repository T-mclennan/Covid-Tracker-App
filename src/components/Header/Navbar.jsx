import React, { useState, useCallback } from 'react'
import { HamburgerSliderReverse } from 'react-animated-burgers'
import {Link} from 'react-router-dom'
import logo from './logo.png'
import './Navbar.css';

function Navbar() {

  // const [click, setClick] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const toggleButton = useCallback(
    () => setIsActive(prevState => !prevState),
    [],
  )

  // const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setIsActive(false)

  return (
    <>

{/* SliderReverse */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo}  alt={logo}/>
            SF Covid Dashboard 
          </div>
          <ul className={!isActive ? 'nav-menu': "nav-menu active"}>
            <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>About</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>Source</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>Github</Link>
            </li>
          </ul>
          {/* <HamburgerSliderReverse
            buttonStyle={{outline: 'none'}}
            barColor="transparent"
          /> */}
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
