import { useState } from "react";
import * as Yup from "yup";

import useCommonFormik from "./useCommonFormik";

const useLoginFormik = () => {
  const fields = {
    LOGIN: "login",
    PASSWORD: "password",
  };

  const [initialValues, setInitialValues] = useState({
    [fields.LOGIN]: "",
    [fields.PASSWORD]: "",
  });

  const validationSchema = Yup.object().shape({
    [fields.LOGIN]: Yup.string().required("Email required"),
    [fields.PASSWORD]: Yup.string().required("Password required")
  })

  const onSubmit = (values) => {
    console.log(values, "LOGIN FORM VALUES>>>>>>>>>>>>>");
  };

  const formik = useCommonFormik(initialValues, onSubmit, validationSchema);

  return {
    formik,
    fields,
    setInitialValues,
  };
};

export default useLoginFormik;
