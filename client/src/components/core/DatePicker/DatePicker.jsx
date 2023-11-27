import React from "react";
import { useFormikContext, ErrorMessage, Formik } from "formik";
import classnames from "classnames";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ name, placeholder, className, asSingle = false }) => {
  const { handleBlur, handleChange,getFieldProps, values, errors, touched, setFieldValue } =
    useFormikContext();
  //@fixme use callback after some time
  const isError = (name) => {
    return errors?.[name] && touched?.[name];
  };

  const handleDateChange = (newValue) => {
    console.log("new value", newValue);
    setFieldValue(name, newValue);
  };

  return (
    <div className={className}>
      <Datepicker
        asSingle={asSingle}
        placeholder={placeholder}
        primaryColor={"purple"}
        inputClassName={classnames(
          [
            "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
          ],
          { [`focus:outline-[red]`]: isError(name) },
          { [`hover:border-[red]`]: isError(name) },
          { [`focus:border-[red]`]: isError(name) }
        )}
        inputName={name}
        onChange={handleDateChange}
        value={getFieldProps(name).value}
      />
      {/* <small className="text-[red] ml-1 mt-1 font-semibold">
        <ErrorMessage name={name} />
      </small> */}
    </div>
  );
};

export default DatePicker;
