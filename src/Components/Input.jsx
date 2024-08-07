import React, { forwardRef, useId } from "react";

const Input = (
  { label, placeholder, className = "", type = "text", ...props },
  ref
) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 px-2">
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        className={` px-3 py-2 rounded-lg bg-white
        text-black outline focus:bg-gray-50
        duration-100 border border-gray-100 w-full ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
