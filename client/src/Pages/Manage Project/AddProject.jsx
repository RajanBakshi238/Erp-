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
                  placeholder="Task Name"
                  className="input input-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Task Description"
                  className="input input-bordered bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageCard>
  );
};

export default AddProject;
