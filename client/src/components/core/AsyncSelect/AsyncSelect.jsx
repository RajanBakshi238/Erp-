import React from "react";
import { useFormikContext, ErrorMessage } from "formik";
import classnames from "classnames";
import { AsyncPaginate } from "react-select-async-paginate";
import { getData } from "../../../utils/api";

const customStyles = {
  control: (provided, state) => {
    // console.log(provided, ">>>>>>>>>", state);
    return {
      ...provided,

      // boxShadow: state.isFocused ? "0 0 0 1px #8231d3" : null,
      boxShadow: null,

      // borderStyle: state.isFocused ? "solid" : "none",
      borderStyle: "none",
      width: "100%",
      height: "100%",
      padding: 0,
      borderRadius: "7px",
      // borderColor: state.isFocused ? "#8231d3" : null,
      borderColor: null,
    };
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#8231d3" : null,
    color: state.isFocused ? "white" : null,
  }),
};


const AsyncSelect = ({ name, placeholder, className, label, apiUrl }) => {
  const { handleBlur, setFieldValue, values, errors, touched, getFieldMeta } =
    useFormikContext();

  //@fixme use callback after some time
  const isError = (name) => {
    return getFieldMeta(name).error && getFieldMeta(name).touched;
  };

  const handleAsyncChange = (e) => {
    // console.log(e, ">>>>>");
    setFieldValue(name, e);
  };

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    const response = await getData(
      `${apiUrl}name=${searchQuery}&page=${page}&limit=${5}`
    );

    if (response.status === 200) {
      // console.log(response.data, " CRPF");
      const options = response.data.users.map((user) => ({
        ...user,
        label: user.name,
        value: user._id,
      }));

      return {
        options: options || [],
        hasMore: Math.ceil(response.data.total / 5) > page,
        additional: {
          page: searchQuery ? 1 : page + 1,
        },
      };
    }
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
      <AsyncPaginate
        name={name}
        onChange={handleAsyncChange}
        onBlur={handleBlur}
        loadOptions={loadOptions}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.label}
        isSearchable={true}
        isMulti
        className={classnames(
          [
            "input p-0 input-bordered flex items-center bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
          ],
          {
            [`focus:outline-[red]`]: isError(name),
          },
          { [`hover:border-[red]`]: isError(name) },
          { [`focus:border-[red]`]: isError(name) }
        )}
        styles={customStyles}
        additional={{
          page: 1,
        }}
        placeholder={placeholder}
      />
      <small className="text-[red] ml-1 mt-1 font-semibold">
        <ErrorMessage name={name} />
      </small>
    </div>
  );
};

export default AsyncSelect;
