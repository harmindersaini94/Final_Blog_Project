import React, { useEffect, useState } from "react";
import postDbObj from "../Appwrite/Database";
import { Button, Card } from "./Index";

const Home = () => {
  const [allPostData, setAllPostData] = useState([]);
  useEffect(() => {
    postDbObj.GetAllPosts().then((res) => {
      setAllPostData(res.documents);
    });
  }, []);

  return (
    // <div className="absolute w-full px-1 lg:px-2">
      // <div className="p-2 lg:p-2">
      //   <div className="text-center ">

              <div className="text-center my-24 lg:my-48 overflow-hidden mx-auto"> 
                <h2 className="text-3xl mb-12 font-semibold text-white">Blogs</h2>
                {/* The card will come inside this div */}
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
                {/* <Button className="mt-12" type="submit" children="See More Listing" /> */}
              </div>

      //   </div>
      // </div>
    //{/* </div> */}
  );
};

export default Home;
