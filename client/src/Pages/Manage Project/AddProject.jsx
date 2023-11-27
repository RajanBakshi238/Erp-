import React from "react";
import classnames from "classnames";
import { ErrorMessage, Form, FormikProvider, FieldArray } from "formik";
import Datepicker from "react-tailwindcss-datepicker";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

import DatePicker from "../../components/core/DatePicker/DatePicker";
import Input from "../../components/core/Inputs/Input";
import Select from "../../components/core/Select/Select";
import Textarea from "../../components/core/Textarea/Textarea";

import PageCard from "../../components/Common/PageCard";
import useAddProjectFormik from "../../hooks/formik/useAddProjectFormik";
import { getData } from "../../utils/api";

import { AsyncPaginate } from "react-select-async-paginate";

const AddProject = () => {
  const { formik, fields, isError } = useAddProjectFormik();

  // console.log(formik.values, ">>>>>>>>>", formik.errors);

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    // console.log(
    //   "inputValue",
    //   searchQuery,
    //   "loadedOptions",
    //   loadedOptions,
    //   "pages",
    //   page
    // );

    const response = await getData(
      `/users/getUsers?name=${searchQuery}&page=${page}&limit=${5}`
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

  const handleAsyncChange = (e) => {
    // console.log(e, ">>>>>");
    formik.setFieldValue(fields.TEAM_MEMBER, e);
  };

  return (
    <PageCard>
      <div className="py-2">
        <h1 className="font-semibold text-lg">Add Project</h1>
      </div>
      <div className="py-2">
        <div class="container mx-auto">
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <div>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                  <Input
                    type="text"
                    name={fields.TITLE}
                    placeholder="Title"
                    label="Title"
                  />
                  <Select name={fields.PRIORITY} label="Priority">
                    <option selected disabled hidden>
                      Priority
                    </option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Select>
                  <div className="flex gap-6">
                    <Input
                      type="text"
                      name={fields.PRICE}
                      placeholder="Price"
                      label="Price"
                      className="w-1/2"
                    />
                    <Select
                      name={fields.PRICE_TYPE}
                      label="Price type"
                      className="w-1/2"
                    >
                      <option>Fixed</option>
                      <option>Hourly</option>
                    </Select>
                  </div>

                  <Select name={fields.STATUS} label="Status">
                    <option>New</option>
                    <option>In progress</option>
                    <option>Open</option>
                    <option>Completed</option>
                    <option>Hold</option>
                  </Select>

                  {/*  field array input   */}
                  <div className="col-start-1 col-end-3">
                    <FieldArray
                      name={fields.PAYMENTS}
                      render={(arrayHelpers) => (
                        <>
                          <label className="label justify-start gap-8 ">
                            <span className="label-text text-[#0a0a0a] text-sm font-medium">
                              Payment Received
                            </span>
                            <span
                              className="hover:cursor-[pointer] hover:text-[#8231d3]"
                              onClick={() =>
                                arrayHelpers.push(fields.PAYMENTS_ITEM)
                              }
                            >
                              <IoIosAddCircleOutline />
                            </span>
                          </label>
                          <div>
                            {formik.values?.[fields.PAYMENTS].map(
                              (payment, index) => (
                                <div
                                  key={index}
                                  className="flex gap-6 mt-3 items-center"
                                >
                                  <span className="ml-3">{index + 1}</span>
                                  <DatePicker
                                    name={`${fields.PAYMENTS}[${index}].date`}
                                    className="w-1/2"
                                    asSingle={true}
                                  />

                                  <Input
                                    type="text"
                                    name={`${fields.PAYMENTS}[${index}].description`}
                                    placeholder="Payment Description"
                                    className="w-1/2"
                                  />
                                  <Input
                                    type="text"
                                    name={`${fields.PAYMENTS}[${index}].amount`}
                                    placeholder="Amount"
                                    className="w-1/2"
                                  />
                                  <span
                                    className="hover:cursor-[pointer] hover:text-[#8231d3]"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    <IoIosRemoveCircleOutline />
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    />
                  </div>

                  <div className="col-start-1 col-end-3">
                    <FieldArray
                      name={fields.PROJECT_PHASES}
                      render={(arrayHelpers) => (
                        <>
                          <label className="label justify-start gap-8 ">
                            <span className="label-text text-[#0a0a0a] text-sm font-medium">
                              Project Phases
                            </span>
                            <span
                              className="hover:cursor-[pointer] hover:text-[#8231d3]"
                              onClick={() =>
                                arrayHelpers.push(fields.PROJECT_PHASES_ITEM)
                              }
                            >
                              <IoIosAddCircleOutline />
                            </span>
                          </label>
                          <div>
                            {formik.values?.[fields.PROJECT_PHASES].map(
                              (payment, index) => (
                                <div
                                  key={index}
                                  className="flex gap-6 mt-3 items-center"
                                >
                                  <span className="ml-3">{index + 1}</span>
                                  <DatePicker
                                    name={`${fields.PROJECT_PHASES}[${index}].period`}
                                    className="w-1/2"
                                    placeholder="Phase period"
                                  />
                                  <Input
                                    type="text"
                                    name={`${fields.PROJECT_PHASES}[${index}].description`}
                                    placeholder="Payment Description"
                                    className="w-1/2"
                                  />
                                  <DatePicker
                                    name={`${fields.PROJECT_PHASES}[${index}].completionDate`}
                                    className="w-1/2"
                                    asSingle={true}
                                    placeholder="Completed on"
                                  />
                                  <span
                                    className="hover:cursor-[pointer] hover:text-[#8231d3]"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    <IoIosRemoveCircleOutline />
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text text-[#0a0a0a] text-sm font-medium">
                        Team member
                      </span>
                    </label>
                    <AsyncPaginate
                      name={fields.TEAM_MEMBER}
                      onChange={handleAsyncChange}
                      onBlur={formik.handleBlur}
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
                          [`focus:outline-[red]`]: isError(fields.TEAM_MEMBER),
                        },
                        { [`hover:border-[red]`]: isError(fields.TEAM_MEMBER) },
                        { [`focus:border-[red]`]: isError(fields.TEAM_MEMBER) }
                      )}
                      styles={customStyles}
                      additional={{
                        page: 1,
                      }}
                      placeholder="Team Member"
                    />
                    <small className="text-[red] ml-1 mt-1 font-semibold">
                      <ErrorMessage name={fields.TEAM_MEMBER} />
                    </small>
                  </div>

                  <Textarea
                    name={fields.DESCRIPTION}
                    className="col-start-1 col-end-3"
                    label="Description"
                  />

                  <div className="form-control w-full col-start-1 col-end-3">
                    <label className="label">
                      <span className="label-text">Upload Project Photos</span>
                      {/* <span className="label-text-alt">Alt label</span> */}
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    type="submit"
                    className="normal-case bg-[#8231d3] hover:bg-[#a158e0] hover:border-[#a158e0] btn btn-primary px-6"
                  >
                    Add Project
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </PageCard>
  );
};

export default AddProject;
