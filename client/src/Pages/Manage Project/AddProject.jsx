import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { ErrorMessage, Form, FormikProvider } from "formik";

import PageCard from "../../components/Common/PageCard";
import useAddProjectFormik from "../../hooks/formik/useAddProjectFormik";
import { getData } from "../../utils/api";

import { AsyncPaginate } from "react-select-async-paginate";

const AddProject = () => {
  const { formik, fields, isError } = useAddProjectFormik();

  // console.log(formik);

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
                  <div>
                    <input
                      type="text"
                      name={fields.TITLE}
                      placeholder="Title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={classnames(
                        [
                          "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
                        ],
                        { [`focus:outline-[red]`]: isError(fields.TITLE) },
                        { [`hover:border-[red]`]: isError(fields.TITLE) },
                        { [`focus:border-[red]`]: isError(fields.TITLE) }
                      )}
                    />
                    <small className="text-[red] ml-1 mt-1 font-semibold">
                      <ErrorMessage name={fields.TITLE} />
                    </small>
                  </div>
                  <div>
                    <select
                      name={fields.PRIORITY}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={classnames(
                        [
                          "select select-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full",
                        ],
                        { [`focus:outline-[red]`]: isError(fields.PRIORITY) },
                        { [`hover:border-[red]`]: isError(fields.PRIORITY) },
                        { [`focus:border-[red]`]: isError(fields.PRIORITY) }
                      )}
                    >
                      <option selected disabled hidden>
                        Priority
                      </option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <small className="text-[red] ml-1 mt-1 font-semibold">
                      <ErrorMessage name={fields.PRIORITY} />
                    </small>
                  </div>
                  <div>
                    <input
                      name={fields.PRICE}
                      onChange={formik.handleChange}
                     
                      className={classnames(
                        [
                          "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
                        ],
                        { [`focus:outline-[red]`]: isError(fields.PRICE) },
                        { [`hover:border-[red]`]: isError(fields.PRICE) },
                        { [`focus:border-[red]`]: isError(fields.PRICE) }
                      )}
                      type="text"
                      placeholder="Price"
                    />
                    <small className="text-[red] ml-1 mt-1 font-semibold">
                      <ErrorMessage name={fields.PRICE} />
                    </small>
                  </div>
                  <div>
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
                        { [`focus:outline-[red]`]: isError(fields.TEAM_MEMBER) },
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
                    {/* <AsyncSelect
                      cacheOptions
                      // components={{Menu}}
                      maxMenuHeight="500px"
                      // defaultOptions
                      loadOptions={loadOptions}
                      // options={option}
                      onMenuScrollToBottom={handleMenuScrollToBottom}
                      // onMenuScrollToBottom={handleScroll}
                      className={classnames(
                        [
                          "select select-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full",
                        ],
                        {
                          [`focus:outline-[red]`]: isError(fields.TEAM_MEMBER),
                        },
                        { [`hover:border-[red]`]: isError(fields.TEAM_MEMBER) },
                        { [`focus:border-[red]`]: isError(fields.TEAM_MEMBER) }
                      )}
                    /> */}
                  </div>

                  {/* <div>
                    <select
                      name={fields.TEAM_MEMBER}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={classnames(
                        [
                          "select select-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full",
                        ],
                        {
                          [`focus:outline-[red]`]: isError(fields.TEAM_MEMBER),
                        },
                        { [`hover:border-[red]`]: isError(fields.TEAM_MEMBER) },
                        { [`focus:border-[red]`]: isError(fields.TEAM_MEMBER) }
                      )}
                    >
                      <option selected disabled hidden>
                        Team Member
                      </option>
                      <option>Rajan</option>
                      <option>Varun</option>
                      <option>Karan</option>
                    </select>
                    <small className="text-[red] ml-1 mt-1 font-semibold">
                      <ErrorMessage name={fields.TEAM_MEMBER} />
                    </small>
                  </div> */}
                  <div className="col-start-1 col-end-3">
                    <textarea
                      name={fields.DESCRIPTION}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={classnames(
                        [
                          "textarea textarea-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full",
                        ],
                        {
                          [`focus:outline-[red]`]: isError(fields.DESCRIPTION),
                        },
                        { [`hover:border-[red]`]: isError(fields.DESCRIPTION) },
                        { [`focus:border-[red]`]: isError(fields.DESCRIPTION) }
                      )}
                      placeholder="Description"
                    ></textarea>
                    <small className="text-[red] ml-1 mt-1 font-semibold">
                      <ErrorMessage name={fields.DESCRIPTION} />
                    </small>
                  </div>
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
