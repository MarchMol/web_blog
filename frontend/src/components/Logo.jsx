import './Logo.css'
import logoAmp from '../assets/logo_amp.png'
import React from 'react'

function Logo () {
  return (
        <div className="logo">
            <p><b>Beat <br /> Buzz</b></p>
            <img src={logoAmp} alt="amp" />
        </div>
  )
}

export default Logo
