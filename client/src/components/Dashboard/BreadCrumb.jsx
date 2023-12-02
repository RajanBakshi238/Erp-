import React, { useState } from "react";
import classnames from "classnames";
import { BiHome } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import style from "./Dashboard.module.css";
import { useEffect } from "react";


const BreadCrumb = () => {
  const { pathname } = useLocation();
  const [breadcrumb, setBreadcrumb] = useState({
    breadItems: [],
    heading: "",
  });
  console.log(pathname, "......>>>>>>>>>>>>..location");

  const getBreadcrumbData = () => {
    let breadItem = routes.find((route) => route.path === pathname);
    console.log(breadItem, ">>>>>>>>>>breadItem>>>>>");
    let breadData = [];
    if(!breadItem ) return
    if (breadItem.breadSubName) {
      breadData.push(breadItem.breadSubName);
      breadData.push(breadItem.breadName);
    } else {      
      breadData.push("Home");
      breadData.push(breadItem.breadName);
    }
    setBreadcrumb({
      breadItems: breadData,
      heading: breadItem.name,
    });
  };

  console.log(breadcrumb, ">>>>>breadCrumb");

  useEffect(() => {
    getBreadcrumbData();
  }, [pathname]);

  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <div className="my-4">
          <h4 className="text-[#444] font-medium text-xl">{breadcrumb.heading}</h4>
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
              <Link href="#">
                <BiHome />
              </Link>
            </li>
            {breadcrumb.breadItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classnames([
                    "text-[#444]",
                    "font-normal",
                    "text-lg",
                    "custom-bread-item",
                  ])}
                >{item}</li>
              );
            })}

            {/* <li
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
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
