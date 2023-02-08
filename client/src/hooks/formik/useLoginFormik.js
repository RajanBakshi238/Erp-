import { useState } from "react";
import * as Yup from "yup";

import useCommonFormik from "./useCommonFormik";

const useLoginFormik = () => {
  const fields = {
    USER: "username",
    PASSWORD: "password",
    KEEP_LOGIN: "keep-login"
  };

  const [initialValues, setInitialValues] = useState({
    [fields.USER]: "",
    [fields.PASSWORD]: "",
    [fields.KEEP_LOGIN]: false
  });

  const validationSchema = Yup.object().shape({
    [fields.USER]: Yup.string().required(" Email required *"),
    [fields.PASSWORD]: Yup.string().required(" Password required *")
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
