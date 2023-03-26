import React from "react";
import classnames from "classnames";
import { BiHome } from "react-icons/bi";

import style from "./Dashboard.module.css";

const BreadCrumb = () => {
  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <div className="my-4">
          <h4 className="text-[#444] font-medium text-xl">Heading Here</h4>
        </div>
      </div>
      <div className="w-1/2 flex">
        <div className="text-sm breadcrumbs my-4 ml-auto">
          <ul>
            <li
              className={classnames([
                "text-[#444]",
                "font-normal",
                "text-lg",
                style["custom-bread-item"],
              ])}
            >
              <a href="#">
                <BiHome />
              </a>
            </li>
            <li
              className={classnames([
                "text-[#444]",
                "font-normal",
                "text-lg",
                "custom-bread-item",
              ])}
            >
              <a href="#">Documents</a>
            </li>
            <li
              className={classnames([
                "text-[#444]",
                "font-normal",
                "text-lg",
                style["custom-bread-item"],
              ])}
            >
              Add Document
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
