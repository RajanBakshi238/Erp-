import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { useAuth } from "../../context/AuthContext/context";

const FeatureAssign = () => {
  const { authObj: {assignedFeatures} } = useAuth();
  const [data, setData] = useState()

    console.log(assignedFeatures, ">>>>>>>>assigned features ")

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
              />
              <span className="label-text pl-2">PM</span>
            </label>
          </div>
        </div>
      ),
    },
  ];

  

  useEffect(() => {
    let featureData = [], i=1;
    for(let feature in assignedFeatures){
        featureData.push({...assignedFeatures[feature], serial: i})
        i++;
    }

    console.log(featureData, ">>>>>>>>>> for in loop")

    setData(featureData);
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default FeatureAssign;
