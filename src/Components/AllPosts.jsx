import React, { useEffect, useState } from 'react'
import postDbObj from '../Appwrite/Database'

const AllPosts = () => {

    const [allPostData, setAllPostData] = useState([])
    useEffect( () => {
       const allPost =  postDbObj.GetAllPosts()
        .then(res => res)

        setAllPostData(allPost);
    }, [])

  return (
    <div>AllPosts</div>
  )
}

export default AllPosts