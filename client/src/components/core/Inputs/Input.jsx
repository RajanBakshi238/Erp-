import React, {forwardRef} from "react";
import PropTypes from "prop-types";
import { useFormikContext, ErrorMessage } from "formik";
import classnames from "classnames";

const Input =forwardRef( ({ type = "text", name, placeholder, className="" }, ref) => {
  const { handleBlur, handleChange, values, errors, touched } = useFormikContext();

  //@fixme use callback after some time 
  const isError = (name) => {
    return errors?.[name] && touched?.[name];
  };

  return (
    <div>
      <input
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        className={classnames(
          [
            "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
            className
          ],
          { [`focus:outline-[red]`]: isError(name) },
          { [`hover:border-[red]`]: isError(name) },
          { [`focus:border-[red]`]: isError(name) }
        )}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <small className="text-[red] ml-1 mt-1 font-semibold">
        <ErrorMessage name={name} />
      </small>
    </div>
  );
});

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number", "password"]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
