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
    </>
  );
};

export default forwardRef(Input);
