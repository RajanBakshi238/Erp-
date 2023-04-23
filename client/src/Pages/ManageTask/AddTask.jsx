import React from "react";
import PageCard from "../../components/Common/PageCard";

const AddTask = () => {
  return (
    <PageCard>
      <div className="py-2">
        <h1 className="font-semibold text-lg">Tasks</h1>
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

export default AddTask;

{
  /* <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <div class="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl">1</div>
    <div class="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl">2</div>
    <div class="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl">3</div>
    <div class="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl">4</div>
</div>
 */
}
