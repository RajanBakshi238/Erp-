import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { useAuth } from "../../../context/AuthContext/context";
import { getData } from "../../../utils/api";
import PageCard from "../../Common/PageCard";
import { getFormatTime, getFormatDate } from "../../../utils/helpers/functions";

const AttendanceTable = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const {
    authObj: {
      auth: { user },
    },
  } = useAuth();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoad(true);
    const response = await getData(`attendance/${user._id}`);
    console.log(response, ".........response");
    if (response.status === 200) {
      setData(
        response.data.attendance.map((item, index) => {
          return {
            ...item,
            serial: index + 1,
          };
        })
      );
    }

    setLoad(false);
  };

  const columns = [
    {
      name: "#",
      selector: (row) => {
        return <>{row.serial}</>;
      },
    },
    {
      name: "Date",
      selector: (row) => {
        return getFormatDate(row.date);
      },
    },
    {
      name: "Punch In",
      selector: (row) => {
        return row.inTime ? getFormatTime(row.inTime) : "-";
      },
    },
    {
      name: "Punch Out",
      selector: (row) => {
        return row.outTime ? getFormatTime(row.outTime) : "-";
      },
    },
    {
      name: "Status",
      selector: (row) => {
        return row.status ? <span className="py-3 px-2 font-semibold text-white capitalize badge badge-success">{row.status}</span> : <span className="py-3 px-2 font-semibold text-white capitalize badge badge-error">absent</span>;
      },
    },
  ];

  return (
    <div>
      <PageCard>
        <div className="py-2">
          <h1 className="font-bold">Attendance Record</h1>
        </div>
        <div className="py-2">
          <DataTable columns={columns} data={data} />
        </div>
      </PageCard>
    </div>
  );
};

export default AttendanceTable;
