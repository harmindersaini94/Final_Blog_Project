import React from "react";

const Button = ({
  children,
  type = "button",
  value = "Submit",
  className = "",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  ...props
}) => {
  return (
    <button
      type={type}
      className="border-3 my-2 p-2 w-full rounded-lg bg-gradient-to-r from-teal-400 to-blue-600 hover:from-pink-500 hover:to-orange-500  text-black font-bold"
      {...props}
    >
      {children}{" "}
    </button>
  );
};

export default Button;
