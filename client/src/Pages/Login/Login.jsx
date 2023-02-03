import React from "react";
import classnames from "classnames";
// import { LogoBg } from "../../constants/images";
import style from "./Login.module.css";

const Login = () => {
  return (
    <div className="flex bg-white">
      <div className={style["login-bg"]}></div>
      <div className="login-form min-w-[72%] flex justify-center items-center">
        <div className="w-1/2 shadow-[0_18px_37.7px_15.3px_rgb(0,0,0,7%)] rounded-md">
          <div className="p-5 text-center text-xl font-semibold border-b border-solid border-[#e3e6ef] text-[#0a0a0a]">
            Sign in
          </div>
          <div className="form-body p-7">
            <div>
              <div className="mb-4 form-control w-full">
                <label className="label">
                  <span className="label-text text-[#0a0a0a] text-sm font-medium">
                    Email Address
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]"
                />
              </div>
              <div className="mb-4 form-control w-full">
                <label className="label">
                  <span className="label-text text-[#0a0a0a] text-sm font-medium">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]"
                />
              </div>
              <div className="flex justify-between text-xs mb-4 mt-2">
                <label className="text-[#747474] font-medium flex items-center ml-1">
                  <span className="flex">
                    <input
                      type="checkbox"
                      // checked
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                  </span>
                  <span className="px-2">Keep me logged in</span>
                </label>
                <p className="text-[#8231d3]">
                  <a href="#">Forget Password?</a>
                </p>
              </div>
              <div className="mt-6">
                <button className="normal-case bg-[#8231d3] hover:bg-[#a158e0] hover:border-[#a158e0] btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
