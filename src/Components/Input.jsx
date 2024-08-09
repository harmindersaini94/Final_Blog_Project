import React, { forwardRef, useId } from "react";

const Input = (
  { label, placeholder, className = "", type = "text", ...props },
  ref
) => {
  const id = useId();

  return (
    <>
      <div className="mb-4 lg:mb-0">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-bold leading-6 text-cyan-600"
          >
            {label}
          </label>
        )}

        <div>
          <input
            className="w-full h-10 rounded-md p-2 bg-gray-100"
            id={id}
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>

      {/* <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 px-2">
            {label}
          </label>
        )}

        <input
          id={id}
          ref={ref}
          type={type}
          className={`${className}`}
          // className={` px-3 py-2 rounded-lg bg-white
          // text-black outline focus:bg-gray-50
          // duration-100 border border-gray-100 w-full ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div> */}
    </>
  );
};

export default forwardRef(Input);
