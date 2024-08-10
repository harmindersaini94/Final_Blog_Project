import React from "react";
import { Link } from "react-router-dom";
import postDbObj from "../Appwrite/Database";

const Card = ({ $id, title, image }) => {
  return (
    <>
      <Link to={`/viewpost/${$id}`}>
        <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
          <img
            alt={title}
            src={postDbObj.PreviewFile(image[0])}
            // className="transition-transform group-hover:scale-110 duration-200 object-cover object-center w-[100%] h-[100%]"
            className="w-300px lg:h-[400px] transition-transform group-hover:scale-110 duration-200 object-cover object-center"
            
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
            <div className="p-3 text-white">
              <h3 className="absolute bottom-6 text-xl font-bold mb-2">
                {title}
              </h3>
              {/* <p className="text-base font-semibold text-gray-900">{title}</p> */}
              <p className="absolute bottom-2 font-semibold">Lorem ipsum Lorem ipsum </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
