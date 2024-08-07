import React, { useEffect, useState } from "react";
import postDbObj from "../Appwrite/Database";
import { Card } from "./Index";

const Home = () => {
  const [allPostData, setAllPostData] = useState([]);
  useEffect(() => {
    postDbObj.GetAllPosts().then((res) => {
      setAllPostData(res.documents);
    });

    // console.log("Home Page ", allPostData);
  }, []);

  return (
    // <div className="w-full py-8 bg-black text-cyan-800">
    //   <div className="flex flex-wrap">
    //     {allPostData.map((post) => (
    //       <div key={post.$id} className="p-8 w-1/4">
    //         {console.log("post here", post)}
    //         <Card {...post} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
      <div className="relative w-full isolate px-1 lg:px-2">
        <div className="py-2 items-center justify-center">
          {/* START - This is the center part where logo will come  */}
          <div className="text-center ">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      Data to enrich your online business
    </h1> */}
            {/* <p className="mt-6 text-lg leading-8 text-gray-600">
      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
      fugiat veniam occaecat fugiat aliqua.
    </p> */}

            <div className="">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-1">
                <div className="max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                  <h2 className="text-2xl font-bold text-white">Blogs</h2>
                  <div className="my-4 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {allPostData.map((post, index) => (
                      index < 3 && (
                        <div key={post.$id}>
                        {/* {console.log("post here", post)} */}
                        <Card {...post} />
                      </div>
                      )

                    ))}
                  </div>
                  {/* <div className="flex flex-wrap gap-5 flex-shrink-0 ">
              {allPostData.map((post) => (
                <div key={post.$id} className="p-8 w-1/4">
                  {console.log("post here", post)}
                  <Card {...post} />
                </div>
              ))}
            </div> */}
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* END - This is the center part where logo will come  */}
        </div>
      </div>
  );
};

export default Home;
