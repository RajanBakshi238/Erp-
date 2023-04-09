import React, { useEffect, useState } from "react";

import PageCard from "../../components/Common/PageCard";
import { useLoader } from "../../context/LoaderContext/context";
import MarkAttendance from "../../components/Pages/Attendance/MarkAttendance";
import style from "./Attendance.module.css";

import AttendanceTable from "../../components/Pages/Attendance/AttendanceTable";

const Attendance = () => {
  const { setLoading } = useLoader();


  return (
    <div>
      <div className={`grid ${style["mark-attendance"]}`}>
        <MarkAttendance />
        <PageCard>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tenetur
          qui, sequi corporis odit libero ducimus adipisci quibusdam reiciendis
          quam impedit officia doloribus ipsum? Quas ut animi perspiciatis
          provident repellendus explicabo, fugiat, et tenetur minima quibusdam
          rerum laboriosam sit beatae nesciunt porro placeat! Quos sequi
          perspiciatis earum saepe ullam quibusdam dolore, at quas consequatur
          impedit nihil? Ad incidunt, asperiores quas ab alias, esse
          consequuntur dolores autem quo aut veritatis nihil. A saepe esse quasi
          officiis iusto! Sed, vero, explicabo pariatur odio reprehenderit a
          accusamus labore assumenda praesentium dolore quae inventore, nihil
          commodi voluptate eveniet vel iusto? A sapiente quas libero! Delectus
          voluptatum sint nesciunt iure, eveniet numquam blanditiis ad, saepe
          maiores at recusandae ex ratione natus neque doloremque, accusantium
          earum voluptas totam aspernatur eum ducimus. Iste, fuga modi debitis
          magnam facilis nemo accusamus, cumque consectetur corrupti voluptatum
          id. Eveniet magnam id, eligendi illum maiores soluta incidunt porro
          iusto laborum nam facere ad esse officiis quis illo? Necessitatibus
          similique, dicta beatae molestiae ea sunt expedita magni vero!
          Exercitationem ut asperiores obcaecati reprehenderit reiciendis
          blanditiis delectus veniam voluptatibus ad possimus consequatur
          nesciunt ipsa debitis quia labore commodi, assumenda amet natus
          recusandae placeat officiis quas nostrum aperiam. Et perspiciatis
          architecto autem id deserunt.
        </PageCard>
      </div>
      <div className="mt-2">
        <AttendanceTable />
      </div>
    </div>
  );
};

export default Attendance;
