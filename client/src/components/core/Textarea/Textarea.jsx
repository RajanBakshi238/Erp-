import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useFormikContext, ErrorMessage } from "formik";
import classnames from "classnames";

const Textarea = forwardRef(({ name, className, label, ...rest }, ref) => {
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
      <textarea
        ref={ref}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classnames(
          [
            "textarea textarea-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full",
          ],
          {
            [`focus:outline-[red]`]: isError(name),
          },
          { [`hover:border-[red]`]: isError(name) },
          { [`focus:border-[red]`]: isError(name) }
        )}
        placeholder="Description"
      ></textarea>
      <small className="text-[red] ml-1 mt-1 font-semibold">
        <ErrorMessage name={name} />
      </small>
    </div>
  );
});

Textarea.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default Textarea;
