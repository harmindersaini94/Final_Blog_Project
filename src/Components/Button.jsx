import React from 'react'

const Button = ({
    children,
    type='button',
    value='Submit',
    className = '',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    ...props
}) => {
  return (
    <button
    type={type}
    className={` px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
    {...props}
    >{children} </button>
  )
}

export default Button