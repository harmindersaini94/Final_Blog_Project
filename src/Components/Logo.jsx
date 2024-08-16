import React from 'react'
import SiteLogo from '../assets/logo.png'

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
    <img
      className="h-12 w-12 rounded-full"
       src={SiteLogo}
      alt="Harminder-Singh-Saini"
    ></img>
  </div>
  )
}

export default Logo