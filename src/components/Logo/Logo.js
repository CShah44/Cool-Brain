import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import robo from './robo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
          <Tilt className='Tilt br2 shadow-2'>
          <img src={robo} alt='Logo'></img>
          </Tilt>
        </div>
    )
}

export default Logo;