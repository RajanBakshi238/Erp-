import React, { useEffect, useState } from "react";
import { BiFingerprint } from "react-icons/bi";

import PageCard from "../../Common/PageCard";
import { useLoader } from "../../../context/LoaderContext/context";
import { useAuth } from "../../../context/AuthContext/context";
import { getData, postData } from "../../../utils/api";
import { getFormatTime } from "../../../utils/helpers/functions";
import { IoFootsteps } from "react-icons/io5";

const MarkAttendance = () => {
  const { setLoading } = useLoader();
  const [presentDay, setPresentDay] = useState();

  const {
    authObj: {
      auth: { user },
    },
  } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getData(`/attendance/present-day/${user._id}`);
      console.log(response, ">>>>>>>>response");

      if (response.status === 200) {
        setPresentDay(response.data?.presentDay?.[0]);
        // var data = moment(response.data?.presentDay?.[0].inTime).format(
        //   "HH:mm A"
        // );
        // console.log(data, "moment format");
      } else {
      }
      setLoading(false);
    })();
  }, []);

  const punchIn = async () => {
    setLoading(true);
    const response = await postData("attendance/enter", {
      user: user._id,
    });
    console.log(response, "response of punchIn.....");
    if (response.status === 200) {
      setPresentDay(response.data);
    } else {
      // error handling
    }
    setLoading(false);
  };

  const punchOut = async () => {
    setLoading(true);
    const response = await postData("attendance/exit", {
      user: user._id,
    });
    console.log(response, ">>>>>>>>>>response of puchout");
    if (response.status === 200) {
      setPresentDay(response.data);
    } else {
      // error handling
    }
    setLoading(false);
  };

  return (
    <PageCard>
      <div className="py-2">
        <h1 className="font-bold">Today Time Utitlisation</h1>
      </div>
      <div className="py-2">
        <div className="flex justify-between py-2 mt-3">
          {presentDay ? (
            <div className="flex items-center gap-2">
              <BiFingerprint className="text-[#a0d9b4] w-7 h-7" />
              <span className="font-semibold">
                Punch In : {getFormatTime(presentDay?.inTime)}
              </span>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 btn btn-sm btn-primary"
              onClick={punchIn}
            >
              <IoFootsteps />
              Punch In
            </button>
          )}

          {presentDay && (
            <div>
              {presentDay?.outTime ? (
                <div className="flex items-center gap-2">
                  <BiFingerprint className="text-[#a0d9b4] w-7 h-7" />
                  <span className="font-semibold">
                    Punch Out : {getFormatTime(presentDay?.outTime)}
                  </span>
                </div>
              ) : (
                <button
                  className="flex items-center gap-2 btn btn-sm btn-primary"
                  onClick={punchOut}
                >
                  <IoFootsteps />
                  Punch Out
                </button>
              )}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </PageCard>
  );
};

export default MarkAttendance;
