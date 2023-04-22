import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import classnames from "classnames";

import { useAuth } from "../../../context/AuthContext/context";
import { getData } from "../../../utils/api";
import PageCard from "../../Common/PageCard";
import { getFormatTime, getFormatDate } from "../../../utils/helpers/functions";

const AttendanceTable = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState();
  const [period, setPeriod] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    authObj: {
      auth: { user },
    },
  } = useAuth();

  useEffect(() => {
    fetchAttendance();
  }, [period]);

  const fetchAttendance = async () => {
    setLoad(true);
    const response = await getData(`attendance/${user._id}?month=${period.month}&year=${period.year}`);
    console.log(response, ".........response");
    if (response.status === 200) {
      setData(
        response?.data?.attendance?.map((item, index) => {
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
        return row.status ? (
          <span
            className={classnames(
              "py-3 px-2 font-semibold text-white capitalize badge",
              {
                "badge-success": row.status === "present",
                "badge-error": row.status === "absent",
              }
            )}
          >
            {row.status}
          </span>
        ) : (
          <span className="py-3 px-2 font-semibold text-white capitalize badge badge-error">
            absent
          </span>
        );
      },
    },
  ];

  let months = [
    { name: "JAN", value: 0 },
    { name: "FEB", value: 1 },
    { name: "MAR", value: 2 },
    { name: "APR", value: 3 },
    { name: "MAY", value: 4 },
    { name: "JUN", value: 5 },
    { name: "JUL", value: 6 },
    { name: "AUG", value: 7 },
    { name: "SEP", value: 8 },
    { name: "OCT", value: 9 },
    { name: "NOV", value: 10 },
    { name: "DEC", value: 11 },
  ];

  const checkActiveMonths = (yearSelected) => {
    let currentYear = new Date().getFullYear();
    if (yearSelected < currentYear) {
      return 11;
    } else {
      return new Date().getMonth();
    }
  };

  return (
    <div>
      <PageCard>
        <div className="py-2 flex justify-between items-center">
          <div>
            <h1 className="font-bold">Attendance Record</h1>
          </div>
          <div className="flex justify-end">
            <select className="select bg-white input-bordered w-full max-w-xs" value={period.month} onChange={(e) => setPeriod({...period, month: e.target.value})}>
              {months.map(({ name, value }, index) => {
                return <option key={index} value={value}>{name}</option>;
              })}
            </select>
            <select className="select bg-white input-bordered w-full max-w-xs" value={period.year} onChange={(e) => setPeriod({...period, year: e.target.value})}>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
            </select>
          </div>
        </div>
        <div className="py-2">
          <DataTable columns={columns} data={data} />
        </div>
      </PageCard>
    </div>
  );
};

export default AttendanceTable;
