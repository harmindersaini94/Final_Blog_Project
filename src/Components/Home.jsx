import React, { useEffect, useState } from "react";
import postDbObj from "../Appwrite/Database";
import {Card} from './Index'

const Home = () => {
  const [allPostData, setAllPostData] = useState([]);
  useEffect(() => {
    postDbObj.GetAllPosts().then((res) => {
      setAllPostData(res.documents);
    })

    // console.log("Home Page ", allPostData);


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
};

export default Home;
