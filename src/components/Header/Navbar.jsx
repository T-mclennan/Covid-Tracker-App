import React, { useState, useCallback } from 'react'
import { HamburgerSliderReverse } from 'react-animated-burgers'
import {Link} from 'react-router-dom'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faTimes, faBars} from '@fortawesome/free-solid-svg-icons'
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
            SF Covid Dashboard 
          </div>
          {/* <div className="menu-icon" onClick={handleClick}>
            {click ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} /> }
          </div> */}
          <ul className={!isActive ? 'nav-menu': "nav-menu active"}>
            <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>About</Link>
              {/* About */}
            </li>
            <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>Github</Link>
              {/* Data  */}
            </li>
            <li className="nav-item">
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>Search</Link>
              {/* Github */}
            </li>
          </ul>
          <HamburgerSliderReverse
            buttonStyle={{}}
            barColor="transparent"
            {...{ isActive, toggleButton }}
          />
        {window.innerWidth <= 800 ? 
         <HamburgerSliderReverse
            buttonStyle={burgerStyle}
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
