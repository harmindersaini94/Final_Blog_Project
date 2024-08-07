import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Protection = ({children}) => {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.loginStatus)

    /**
     * So Here if we remove the useEffect and put the logic outside
     * then the app will crash because of to-many re-renders. 
     * Why, coz each time the If statement runs, it run the setLoader() to change the state, that result in re-render
     * and the page again runs the same code leading to stack overflow/to many re-renders
     * 
     * But when we used the useEffect() hook, it runs the first time and change the state, but it wont run until there is any change of 
     * state, resulting in showing our code
     * 
     * But what if the dependency array is removed, then also it is not runing into infinite looping? why?
     * React do two things
     * 
     * 1. Unmounting, here since we are using navigate to move to another component, so useEffect immediately unmout the current componenet
     * thus ending the for-loop
     * 
     * 2. Batching, internally even if the user do not pass the dependency array, react still create a bacthc of all the updates and does
     * it in one go, inspite of re-rendering it again and again.
     */
    useEffect( () => {
        if(!authStatus){
            navigate("/")
            setLoader(false)
        }
        else setLoader(false)
    }, [authStatus, navigate])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protection