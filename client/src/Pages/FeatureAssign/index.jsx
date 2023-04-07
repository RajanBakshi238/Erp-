import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdDeleteOutline } from "react-icons/md";

import { patchData, deleteData } from "../../utils/api";
import { useLoader } from "../../context/LoaderContext/context";
import { useAuth } from "../../context/AuthContext/context";

const FeatureAssign = () => {

  const {loading, setLoading} = useLoader();

  const {
    authObj: { assignedFeatures },
  } = useAuth();
  const [data, setData] = useState();

  console.log(assignedFeatures, ">>>>>>>>assigned features ");

  // update Features
  const handleUpdate = async (e, id, role) => {

    let selectedData = data.find((item) => item._id === id);

    if (e.target.checked) {
      if (selectedData.allowedTo.includes(role)) return;
      selectedData.allowedTo.push(role);
    } else {
      selectedData.allowedTo = selectedData.allowedTo.filter(
        (item) => item !== role
      );
    }

    const response = await patchData(
      `/assignFeatures/${selectedData._id}`,
      selectedData
    );
    console.log(response, ">>>>>> response.......");

    setData(
      data.map((item) => {
        if (item._id === id) {
          return selectedData;
        }

        return item;
      })
    );

    // hit api with this selected data...
    console.log(selectedData, ">>>>>>>selectedData");
  };

  // delete Feature
  const handleDelete = async (id) => {
    setLoading(true)
    const response = await deleteData(`/assignFeatures/${id}`);
    console.log(response, "delete response>>>>");
    if (response.status === 200) {
      setData((prev) => {
        return prev.filter((feature) => feature._id !== id);
      });
    }
    setLoading(false)
  };

  console.log(data, ">>>>>>>>>>finalized data...");

  const columns = [
    {
      name: "Serial No.",
      selector: (row) => row.serial,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Feature Check Name",
      selector: (row) => row.featureName,
    },
    {
      name: "Assigned To",
      maxWidth: "600px",
      selector: (row) => (
        <div className="flex gap-2">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={row.allowedTo.includes("user")}
                className="checkbox checkbox-sm checkbox-primary"
                onChange={(e) => handleUpdate(e, row._id, "user")}
              />
              <span className="label-text pl-2">User</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={row.allowedTo.includes("hr")}
                className="checkbox checkbox-sm checkbox-primary"
                onChange={(e) => handleUpdate(e, row._id, "hr")}
              />
              <span className="label-text pl-2">HR</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                defaultChecked={row.allowedTo.includes("pm")}
                onChange={(e) => handleUpdate(e, row._id, "pm")}
              />
              <span className="label-text pl-2">PM</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <MdDeleteOutline
          className="w-7 h-7 cursor-pointer"
          onClick={() => handleDelete(row._id)}
        />
      ),
    },
  ];

  useEffect(() => {
    let featureData = [],
      i = 1;
    for (let feature in assignedFeatures) {
      featureData.push({ ...assignedFeatures[feature], serial: i });
      i++;
    }

    console.log(featureData, ">>>>>>>>>> for in loop");

    setData(featureData);
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default FeatureAssign;
