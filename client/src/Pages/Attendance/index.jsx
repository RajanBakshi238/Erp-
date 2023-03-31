import React from "react";

import { BiFingerprint } from "react-icons/bi";
import { IoFootsteps } from "react-icons/io5";

import style from "./Attendance.module.css";

const Attendance = () => {
  return (
    <div>
      <div className={`grid ${style["mark-attendance"]}`}>
        <div className="p-3 border-2 bg-white rounded-md text-black">
          <div className="py-2">
            <h1 className="font-bold">Today Time Utitlisation</h1>
          </div>
          <div className="py-2">
            <div className="flex justify-between py-2 mt-3">
              {/* <div className="flex items-center gap-2" >
                <BiFingerprint className="text-[#a0d9b4] w-7 h-7"/>
                <span className="font-semibold">Punching: 10: 00 Am</span>
              </div> */}
              <button className="flex items-center gap-2 btn btn-sm btn-primary">
                <IoFootsteps />
                Punch In
              </button>
              <div>
                <button className="flex items-center gap-2 btn btn-sm btn-primary">
                  <IoFootsteps />
                  Punch Out
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="p-3 border-2 bg-white rounded-md">
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
        </div>
      </div>
    </div>
  );
};

export default Attendance;
