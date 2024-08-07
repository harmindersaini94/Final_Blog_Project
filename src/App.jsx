import { Outlet } from 'react-router-dom'
import {Header, Footer} from './Components/Index'
import { useEffect } from 'react'
import authObj from './Appwrite/Auth';
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from './Slice/HomestaySlice';


function App() {

  const dispatch = useDispatch()

  useEffect( () => {
    authObj.GetCurrentLoggedInUser()
    .then(userdata => {
      if(userdata)
        dispatch(login({userdata}))
      else dispatch(logout())
    })
  }, []);

  return (
    <>
      <Header/>
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default App
