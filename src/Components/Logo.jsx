import React from 'react'
import SiteLogo1 from '../assets/Designer.png'
import SiteLogo2 from '../assets/BlogLogo.png'

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
    <img
      className="w-20 rounded-full"
      src={SiteLogo2}
      alt="Harminder-Singh-Saini"
    ></img>
  </div>
  )
}

export default Logo