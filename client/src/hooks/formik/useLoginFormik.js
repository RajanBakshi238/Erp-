import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

import useCommonFormik from "./useCommonFormik";
import { postData } from "../../utils/api";
import { useAuth } from "../../context/AuthContext/context";

const useLoginFormik = () => {
    
  const { setAuth } = useAuth();
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

  const onSubmit = async (values) => {
    const response = await postData("users/login", values);
    
    if (response?.data?.status === 200) {
      toast.success(response?.data?.message ?? 'Login successfully !')
      setAuth(response?.data);
      navigate(from, { replace: true });
    }else{
      toast.error(response?.error ?? 'Something went wrong')
    }
  };

  const formik = useCommonFormik(initialValues, onSubmit, validationSchema);

  return {
    formik,
    fields,
    setInitialValues,
  };
};

export default useLoginFormik;
