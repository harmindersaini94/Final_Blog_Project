import React, { forwardRef, useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-bold leading-6 text-cyan-600"
        >
          {label} :
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={` px-3 py- rounded-lg bg-white
                text-black outline-non focus:bg-gray-50
                duration-200 border border-gray-200 w-full ${className}`}
      >
        {options.length > 0 &&
          options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
