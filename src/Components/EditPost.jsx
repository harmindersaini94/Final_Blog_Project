import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import postDbObj from '../Appwrite/Database'
import {AddPost} from './Index'

const EditPost = () => {
    const {id} = useParams()
    const [postData, setPostData] = useState(null);
    const [postImg, setPostImage] = useState([]);
    const navigate = useNavigate()
   

    useEffect(() => {
        if(id){ // Means if user put any vauge id, then just navigate to home page
            postDbObj.GetParticularPost(id).then((post) => {
                if (post) {
                  console.log(post.address);
                  setPostData(post);
                  
                  const pImg = postDbObj.PreviewFile(post.image[0]);
                  setPostImage(pImg);
                }
              });
        }
        else navigate("/")
    
      }, [id, navigate]); 

  return postData? (
    <div><AddPost postEditData={postData}/></div>
  ) : null
}

export default EditPost