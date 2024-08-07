import React from 'react'
import {Button, Logo} from './Index'
const Logout = () => {
  return (
    <div className=' bg-gray-100 text-gray-900 flex justify-center'>
     <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo ></Logo>
            </span>
            </div>
            <div className='mt-12 flex flex-col items-center'>
                <h1 className='text-2xl xl:text-3xl font-extrabold'>Sign Up</h1>
                <div className='w-full flex-1 mt-8'>
                    {/* <div className='flex flex-col items-center'>

                    </div> */}
                    <div className='m-12 border-b text-center'>
                        <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                            Sign Up With Email
                        </div>
                    </div>
                    <div className='mx-auto max-w-xs'>
                        <input type='email' placeholder='Email' className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
                        <input type='password' placeholder='Password' className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'/>
                        <Button 
                        className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        children="Sign Up"
                        type="submit"
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Logout