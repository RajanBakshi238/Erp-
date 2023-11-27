import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useFormikContext, ErrorMessage } from "formik";
import classnames from "classnames";

const Input = forwardRef(
  (
    { type = "text", name, placeholder, className = "", label, ...rest },
    ref
  ) => {
    const { handleBlur, handleChange, values, errors, touched, getFieldMeta } =
      useFormikContext();
    //@fixme use callback after some time
    const isError = (name) => {
      return getFieldMeta(name).error && getFieldMeta(name).touched;
    };

    return (
      <div className={className}>
        {label && (
          <label className="label">
            <span className="label-text text-[#0a0a0a] text-sm font-medium">
              {label}
            </span>
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className={classnames(
            [
              "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
            ],
            { [`focus:outline-[red]`]: isError(name) },
            { [`hover:border-[red]`]: isError(name) },
            { [`focus:border-[red]`]: isError(name) }
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
        <small className="text-[red] ml-1 mt-1 font-semibold">
          <ErrorMessage name={name} />
        </small>
      </div>
    );
  }
);

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number", "password"]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default Input;
