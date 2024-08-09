import React, { useEffect, useState } from "react";
import postDbObj from "../Appwrite/Database";
import {Card} from './Index'
import { useParams } from "react-router-dom";

const MyPost = () => {

  const [allPostData, setAllPostData] = useState([]);
  const {userid} = useParams()

  useEffect(() => {
    postDbObj.GetAllPostForAUser(userid).then((res) => {
      setAllPostData(res.documents);
    })
  },[]);

  return (
    <div className="text-center my-4 lg:my-8 overflow-hidden mx-auto"> 
    <h2 className="text-4xl mb-12 font-bold text-cyan-600">My Stories</h2>
    <div className="w-full lg:w-full flex flex-wrap justify-center items-center gap-8 content-center">
      {allPostData.map(
        (post, index) =>
          index < 3 && (
            <div key={post.$id} className="">
              <Card {...post} />
            </div>
          )
      )}
      
    </div>
  </div>
    // <div className="w-full py-8">
    //   <div className="flex flex-wrap">
    //     {allPostData.map((post) => (
    //       <div key={post.$id} className="p-8 w-1/4">
    //         {console.log("post here", post)}
    //         <Card {...post} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default MyPost