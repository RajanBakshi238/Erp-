import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";

const FeatureAssign = () => {
  const columns = [
    {
      name: "Serial No.",
      selector: (row) => row.serial,
    },
    {
      name: "Feature Name",
      selector: (row) => row.title,
    },
    {
      name: "Assigned To",
      maxWidth: "600px",
      selector: (row) => (
        <div className="flex gap-2">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text pl-2">User</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text pl-2">HR</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              <span className="label-text pl-2">PM</span>
            </label>
          </div>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      title: "DashBoard",
      year: "1988",
    },
    {
      id: 2,
      title: "Profile",
      year: "1984",
    },
    {
      id: 3,
      title: "Transaction",
      year: "1984",
    },
  ]);

  useEffect(() => {
    setData(data.map((photo, index) => ({ serial: index + 1, ...photo })));
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default FeatureAssign;
