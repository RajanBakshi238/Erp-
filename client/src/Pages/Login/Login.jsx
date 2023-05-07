import React, { useEffect, useState } from "react";
import { ErrorMessage, Form, FormikProvider } from "formik";
import classnames from "classnames";

import useLoginFormik from "../../hooks/formik/useLoginFormik";

import style from "./Login.module.css";
import useRefershToken from "../../hooks/auth/useRefershToken";
import { useAuth } from "../../context/AuthContext/context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { authObj } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefershToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err, "error for persisting");
      } finally {
        setIsLoading(false);
      }
    };

    !authObj?.auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    // console.log(authObj, ">>>>>>>>>>>AUTH OBJ")

    if (authObj?.auth.accessToken) {
      navigate("/");
    }
  }, [isLoading]);

  const { formik, fields } = useLoginFormik();

  const isError = (name) => {
    return formik.errors?.[name] && formik.touched?.[name];
  };

  if (isLoading) {
    return <p>Loading ..............Login page</p>;
  }


  console.log(formik, ">>>>>>>>>>>>>>")

  return (
    <div className="flex bg-white">
      <div className={style["login-bg"]}></div>
      <div className="login-form min-w-[72%] flex justify-center items-center">
        <div className="w-1/2 shadow-[0_18px_37.7px_15.3px_rgb(0,0,0,7%)] rounded-md">
          <div className="p-5 text-center text-xl font-semibold border-b border-solid border-[#e3e6ef] text-[#0a0a0a]">
            Sign in
          </div>
          <div className="form-body p-7">
            <FormikProvider value={formik}>
              <Form onSubmit={formik.handleSubmit}>
                <div className="mb-4 form-control w-full">
                  <label className="label">
                    <span className="label-text text-[#0a0a0a] text-sm font-medium">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="name@example.com"
                    name={fields.USER}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={classnames(
                      [
                        "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
                      ],
                      { [`focus:outline-[red]`]: isError(fields.USER) },
                      { [`hover:border-[red]`]: isError(fields.USER) },
                      { [`focus:border-[red]`]: isError(fields.USER) }
                    )}
                  />
                  <small className="text-[red] ml-1 mt-1 font-semibold">
                    <ErrorMessage name={fields.USER} />
                  </small>
                </div>
                <div className="mb-4 form-control w-full">
                  <label className="label">
                    <span className="label-text text-[#0a0a0a] text-sm font-medium">
                      Password
                    </span>
                  </label>
                  <input
                    name={fields.PASSWORD}
                    type="password"
                    placeholder="Enter password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={classnames(
                      [
                        "input input-bordered w-full bg-white focus:outline-[#8231d3] focus:border-[#8231d3] hover:border-[#8231d3]",
                      ],
                      { [`focus:outline-[red]`]: isError(fields.PASSWORD) },
                      { [`hover:border-[red]`]: isError(fields.PASSWORD) },
                      { [`focus:border-[red]`]: isError(fields.PASSWORD) }
                    )}
                  />
                  <small className="text-[red] ml-1 mt-1 font-semibold">
                    <ErrorMessage name={fields.PASSWORD} />
                  </small>
                </div>
                <div className="flex justify-between text-xs mb-4 mt-2">
                  <label className="text-[#747474] font-medium flex items-center ml-1">
                    <span className="flex">
                      <input
                        type="checkbox"
                        name={fields.KEEP_LOGIN}
                        onChange={formik.handleChange}
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
                  <button
                    type="submit"
                    className="normal-case bg-[#8231d3] hover:bg-[#a158e0] hover:border-[#a158e0] btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
