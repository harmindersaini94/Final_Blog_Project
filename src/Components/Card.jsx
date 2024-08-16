import React from "react";
import { Link } from "react-router-dom";
import postDbObj from "../Appwrite/Database";
import userLogo from "../assets/user.jpg";

const Card = ({ $id, title, image, email }) => {
  const match = email.match(/^([^@]+)@/);
  const finalTxt = match ? match[1] : "";
   
  return (
    <>
      <Link to={`/viewpost/${$id}`}>
        <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
          <img
            alt={title}
            src={postDbObj.PreviewFile(image[0])}
            className="w-[300px] h-[300px] lg:h-[300px] transition-transform group-hover:scale-110 duration-200 object-cover object-center"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
            <div className="p-3 text-white">
              <h3 className="absolute bottom-6 text-xl font-bold mb-2 whitespace-nowrap w-full overflow-hidden overflow-ellipsis text-left">
                {title}
              </h3>
              <p className="absolute bottom-2 text-sm text-left flex gap-1">
                <span>
                  <img src={userLogo} className="rounded-full" />
                </span>
                {/* {email.match(/^([^@]+)@/) ? email.match(/^([^@]+)@/)[1] : ""} */}
                {finalTxt}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
