import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { getData } from "../../utils/api";

import useCommonFormik from "./useCommonFormik";
import { postData } from "../../utils/api";
import { useAuth } from "../../context/AuthContext/context";

const useLoginFormik = () => {
  const { dispatch } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const fields = {
    USER: "email",
    PASSWORD: "password",
    KEEP_LOGIN: "keep-login",
  };

  const [initialValues, setInitialValues] = useState({
    [fields.USER]: "",
    [fields.PASSWORD]: "",
    [fields.KEEP_LOGIN]: false,
  });

  const validationSchema = Yup.object().shape({
    [fields.USER]: Yup.string().required(" Email required *"),
    [fields.PASSWORD]: Yup.string().required(" Password required *"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const response = await postData("users/login", values);
    console.log("response", response);
    if (response?.status === 200) {
      const featureData = await getData("/assignFeatures");
      console.log(featureData, ">>>>>>>>>>>>reposne of assigned features");
      if (featureData?.status === 200) {
        dispatch({
          type: "FEATURE",
          assignedFeatures: featureData.data.feature,
        });
      }

      dispatch({
        type: "AUTH",
        auth: response?.data,
      });
      // setAuth(response?.data);
      resetForm();
      console.log(from, ">>>>>>>>>>>>>>>>>");
      setTimeout(() => {
        navigate("/test_page", { replace: true });
      }, 200);
      toast.success(response?.message ?? "Login successfully !.....");
    } else {
      toast.error(response?.message ?? "Something went wrong");
    }
  };

  const {formik, isError} = useCommonFormik(initialValues, onSubmit, validationSchema);

  return {
    formik,
    fields,
    setInitialValues,
  };
};

export default useLoginFormik;
