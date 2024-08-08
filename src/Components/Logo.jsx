import React from 'react'
import SiteLogo1 from '../assets/Designer.png'
import SiteLogo2 from '../assets/BlogLogo.png'
import SiteLogo3 from '../assets/Logo_2.png'

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
    <img
      // className="w-20 rounded-full"
      className="h-12 w-12 rounded-full"
      src={SiteLogo3}
      alt="Harminder-Singh-Saini"
    ></img>
  </div>
  )
}

export default Logo