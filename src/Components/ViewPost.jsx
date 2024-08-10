import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import postDbObj from "../Appwrite/Database";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "./Index";
import Loader from "./Loader";
import { motion } from "framer-motion";

const ViewPost = () => {
  const [postData, setPostData] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const [postImg, setPostImage] = useState([]);
  const [author, setAuthor] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  const [updated, setUpdated] = useState(null);

  const loggedUserDetail = useSelector((state) => state.userdata);

  // Checking if the post author is logged user
  const isSame =
    postData && loggedUserDetail
      ? loggedUserDetail.$id === postData.userid
      : false;

  const deletePost = () => {
    setLoading(true);
    postDbObj.DeletePost(postData.$id).then((response) => {
      if (response) {
        for (let i = 0; i < postData.image.length; i++) {
          postDbObj.DeleteFile(postData.image[i]);
        }
        setLoading(false);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    postDbObj.GetAllPosts().then((response) => {
      if (response) {
        setAllPost(response.documents);
      }
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      // Means if user put any vauge id, then just navigate to home page
      postDbObj.GetParticularPost(id).then((post) => {
        if (post) {
          setPostData(post);
          const creationDate = new Date(post.$createdAt);
          const updationDate = new Date(post.$updatedAt);
          const options = { year: "numeric", month: "long", day: "numeric" };

          setCreated(creationDate.toLocaleDateString("en-US", options));
          setUpdated(updationDate.toLocaleDateString("en-US", options));

          const pImg = postDbObj.PreviewFile(post.image[0]);
          setPostImage(pImg);
        }
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]); // Each time there is navigation of change of ID, run useEffect

  return postData ? (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}
      <div className="container mx-auto px-4 py-8 mt-16 flex flex-col lg:flex-row">
        {/* <!-- Sidebar --> */}
        <motion.aside
          className="w-full lg:w-1/5 bg-gradient-to-r from-teal-400 to-cyan-600 p-4 shadow mb-4 lg:mb-0 rounded-xl "
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl  font-extrabold mb-4">
            Here's what others are saying...
          </h2>
          <ul className="space-y-2">
            {allPost &&
              allPost?.map((post, index) => (
                <li key={index}>
                  <Link
                    to={`/viewpost/${post.$id}`}
                    className="text-gray-700 italic hover:text-black hover:font-semibold"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}

            {/* <!-- Add more categories as needed --> */}
          </ul>
        </motion.aside>

        <motion.main
          className="w-full rounded-xl  lg:w-4/5 bg-gradient-to-r from-teal-400 to-cyan-600 text-black font-semibold p-4 shadow lg:ml-4 content-center"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <article>
            <div className="flex flex-wrap justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{postData.title}</h2>
              </div>
              <div className="flex flex-wrap justify-around gap-4">
                <div>
                  {isSame && (
                    <Link to={`/editpost/${postData.$id}`}>
                      <Button bgColor="bg-green-500">Edit</Button>
                    </Link>
                  )}
                </div>
                <div>
                  {isSame && (
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <h3 className="text-gray-600 italic mb-5">
              {/* Created at: {postData.$createdAt} */}
              Created on : {created}
              {postData.$updatedAt && <span> || Updated on : {updated}</span>}
            </h3>

            <div className="flex justify-center items-center group">
              <img
                src={postImg}
                alt={postData.title}
                className="mb-4 rounded-lg border-2 border-black transition-transform group-hover:scale-110 duration-200 w-[300px] lg:w-[400px]  object-contain"
              />
            </div>

            <h3>{parse(postData.description)}</h3>
          </article>
        </motion.main>
      </div>
    </>
  ) : null;

  // <div className="py-8">
  //   <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
  //     <img src={postImg} alt={postData.title} className="rounded-xl" />
  //     {
  //         isSame && (
  //             <div className="absolute right-6 top-6">
  //             <Link to={`/editpost/${postData.$id}`}>
  //                 <Button bgColor="bg-green-500" className="mr-3">
  //                     Edit
  //                 </Button>
  //             </Link>
  //             <Button bgColor="bg-red-500" onClick={deletePost}>
  //                 Delete
  //             </Button>
  //         </div>
  //         )
  //     }
  //   </div>
  //   <div className="w-full mb-6">
  //     <h1 className="text-2xl font-bold">{postData.title}</h1>
  //   </div>
  //   <div className="browser-css">{parse(postData.description)}</div>
  // </div>
};

export default ViewPost;
