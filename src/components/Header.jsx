import React from 'react'
import { Link } from 'react-scroll';
import '../Styles/Header.css'

const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-logo'>
        <h1>ROXILER</h1>
        <p>SYSTEMS</p>
      </div>
      <div className='header-nav'>
        <ul>
          <Link to='Table' smooth={true} duration={500}><li>Table</li></Link>
          <li><Link to='Statistics' smooth={true} duration={500}>Statistics</Link></li>
          <li><Link to='Charts' smooth={true} duration={500}>Charts</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header