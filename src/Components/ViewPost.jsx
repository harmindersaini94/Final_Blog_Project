import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import postDbObj from "../Appwrite/Database";
import parse from 'html-react-parser'
import { useSelector } from "react-redux";
import {Button} from './Index'

const ViewPost = () => {
  const [postData, setPostData] = useState(null);
  const [postImg, setPostImage] = useState([]);
  const [author, setAuthor] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()

  const loggedUserDetail = useSelector(state => state.userdata)

  // Checking if the post author is logged user
  const isSame = postData && loggedUserDetail? loggedUserDetail.$id === postData.userid : false

  const deletePost = () =>{
    postDbObj.DeletePost(postData.$id)
    .then(response => {
        if(response){
            for(let i=0; i < postData.image.length; i++){
                postDbObj.DeleteFile(postData.image[i])
            }
            navigate("/")
        }
    })
  }

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

  }, [id, navigate]);  // Each time there is navigation of change of ID, run useEffect
  return postData ? (
    <div className="py-8">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img src={postImg} alt={postData.title} className="rounded-xl" />
        {
            isSame && (
                <div className="absolute right-6 top-6">
                <Link to={`/editpost/${postData.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                        Edit
                    </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                </Button>
            </div>
            )
        }
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{postData.title}</h1>
      </div>
      <div className="browser-css">{parse(postData.description)}</div>
    </div>
  ) : null;
};

export default ViewPost;
