import React from "react";
import { Link } from "react-router-dom";
import postDbObj from "../Appwrite/Database";

const Card = ({ $id, title, image }) => {
  return (
    <>
      {/* <Link to={`/viewpost/${$id}`}>
        <div className="w-full h-72 justify-center  bg-teal-950 text-black rounded-xl p-4">
          <div className="w-full justify-center mb-3">
            {console.log("Image here", image)}
            <img
              src={postDbObj.PreviewFile(image[0])}
              alt={title}
              className="rounded-xl w-52 h-52"
            ></img>
          </div>
          <h2 className="whitespace-nowrap w-full overflow-hidden overflow-ellipsis font-bold">
            {title}
          </h2>
        </div>
      </Link> */}

      <Link to={`/viewpost/${$id}`}>
        {/* <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"> */}
          {/* <div className="group relative"> */}
            <div className=" max-w-md shadow-lg rounded-lg backdrop-blur-sm bg-white/10 group-hover:opacity-75">
            {/* <div className="relative"> */}
              <img
                alt={title}
                src={postDbObj.PreviewFile(image[0])}
                // className="mx-auto w-full h-full object-cover object-center"
                className="m-4 p-12 w-[40rem] h-[30rem] text-center object-cover object-center"
              />
            {/* </div> */}
            <h3 className="mt-6 text-sm text-gray-500">
              <span className="absolute inset-0" />
              {title}
            </h3>
            <p className="text-base font-semibold text-gray-900">{title}</p>
          </div>
        {/* </div> */}
      </Link>
    </>
  );
};

export default Card;
