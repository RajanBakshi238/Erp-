import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useFormikContext, ErrorMessage } from "formik";
import classnames from "classnames";

const Select = forwardRef(
  ({ name, className, label, children, ...rest }, ref) => {
    const { handleBlur, handleChange, values, errors, touched } =
      useFormikContext();
    //@fixme use callback after some time
    const isError = (name) => {
      return errors?.[name] && touched?.[name];
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
        <select
          ref={ref}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classnames(
            [
              "select select-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full",
            ],
            { [`focus:outline-[red]`]: isError(name) },
            { [`hover:border-[red]`]: isError(name) },
            { [`focus:border-[red]`]: isError(name) }
          )}
          {...rest}
        >
          {children}
          {/* <option selected disabled hidden>
            Priority
          </option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option> */}
        </select>
        <small className="text-[red] ml-1 mt-1 font-semibold">
          <ErrorMessage name={name} />
        </small>
      </div>
    );
  }
);

Select.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.element,
};

export default Select;
