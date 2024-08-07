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
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {allPostData.map((post) => (
          <div key={post.$id} className="p-8 w-1/4">
            {console.log("post here", post)}
            <Card {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPost