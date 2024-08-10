import React, { useEffect, useState } from "react";
import postDbObj from "../Appwrite/Database";
import { Button, Card } from "./Index";
import Loader from "./Loader";

const Home = () => {
  const [allPostData, setAllPostData] = useState([]);

  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    setLoading(true);
    postDbObj.GetAllPosts().then((res) => {
     
      if (res) {
        setAllPostData(res.documents);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}

      <div className="text-center my-12 lg:my-24 overflow-hidden mx-auto">
        <h2 className="text-4xl mb-12 font-bold text-cyan-600">
          Our Top Stories
        </h2>
        {/* The card will come inside this div */}
        <div className="w-full lg:w-full flex flex-wrap justify-center items-center gap-8 content-center">
          {allPostData?.map( // ? is doneso that even if array 
            (post, index) =>
              // index < 3 && (
                <div key={post.$id} className="">
                  <Card {...post} />
                </div>
              // )
          )}
        </div>
        {/* <Button className="mt-12" type="submit" children="See More Listing" /> */}
      </div>
    </>
    //   </div>
    // </div>
    //{/* </div> */}
  );
};

export default Home;
