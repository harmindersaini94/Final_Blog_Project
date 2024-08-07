import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import {Home, Login, Signup, Logout, AddPost, AllPosts, MyPost, ViewPost, EditPost, Protection} from './Components/Index.js'
import { Provider } from 'react-redux'
import store from './Store.js'

const appRoute = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/add-post' element={<Protection><AddPost /></Protection>}></Route>
        <Route path='/all-posts' element={<Protection><AllPosts /></Protection>}></Route>
        <Route path='/my-post/:userid' element={<Protection><MyPost /></Protection>}></Route>
        <Route path='/viewpost/:id' element={<Protection><ViewPost /></Protection>}></Route>
        <Route path='/editpost/:id' element={<Protection><EditPost /></Protection>}></Route>
    </Route>
  ])
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={appRoute} />
    </Provider>
  </React.StrictMode>,
)
