import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postDbObj from "../Appwrite/Database";
import { AddPost } from "./Index";
import Loader from "./Loader";

const EditPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [postImg, setPostImage] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Means if user put any vauge id, then just navigate to home page
      setLoading(true);
      postDbObj.GetParticularPost(id).then((post) => {
        if (post) {
          console.log(post.address);
          setPostData(post);

          const pImg = postDbObj.PreviewFile(post.image[0]);
          setPostImage(pImg);
        }
      });
    } else navigate("/");

    setLoading(false);
  }, [id, navigate]);

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}
      {postData && (
        <div>
          <AddPost postEditData={postData} />
        </div>
      )}
    </>
  );
};

export default EditPost;
