import React from 'react'
import {DNA} from 'react-loader-spinner'

const Loader = () => {
  return (
    <DNA
    visible={true}
    height="111"
    width="111"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
    />
  )
}

export default Loader