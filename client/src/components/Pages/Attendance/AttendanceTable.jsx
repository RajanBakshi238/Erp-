import React, { useEffect, useState } from "react";

import { useAuth } from "../../../context/AuthContext/context";
import { getData } from "../../../utils/api";
import PageCard from "../../Common/PageCard";

const AttendanceTable = () => {
  const [load, setLoad] = useState(false);
  const {
    authObj: {
      auth: { user },
    },
  } = useAuth();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoad(true)
    const response = await getData(`attendance/${user._id}`);
    console.log(response, ".........response");
    setLoad(false)
  };

  return (
    <div>
      <PageCard>
        <div className="py-2">
          <h1 className="font-bold">Attendance Record</h1>
        </div>
        <div className="py-2"></div>
      </PageCard>
    </div>
  );
};

export default AttendanceTable;
