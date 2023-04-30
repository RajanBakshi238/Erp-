import React from "react";
import PageCard from "../../components/Common/PageCard";

const AddProject = () => {
  return (
    <PageCard>
      <div className="py-2">
        <h1 className="font-semibold text-lg">Add Project</h1>
      </div>
      <div className="py-2">
        <div class="container mx-auto">
          <div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full"
                />
              </div>
              <div>
                <select className="select select-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full">
                  <option selected disabled hidden>
                    Priority
                  </option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Price"
                  className="input input-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full"
                />
              </div>
              <div>
                <select className="select select-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full">
                  <option selected disabled hidden>
                    Team Member
                  </option>
                  <option>Rajan</option>
                  <option>Varun</option>
                  <option>Karan</option>
                </select>
              </div>
              <div className="col-start-1 col-end-3">
                <textarea
                  className="textarea textarea-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full"
                  placeholder="Description"
                ></textarea>
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
        </div>
      </div>
    </PageCard>
  );
};

export default AddProject;
