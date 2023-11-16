import React, { useState } from "react";
import * as Yup from "yup";

import useCommonFormik from "./useCommonFormik";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";

const useAddProjectFormik = () => {
  const fields = {
    TITLE: "title",
    PRIORITY: "priority",
    PRICE: "price",
    TEAM_MEMBER: "teamMember",
    DESCRIPTION: "description",
    PIC: "pic",
  };

  const [initialValues, setInitialValues] = useState({
    [fields.TITLE]: "",
    [fields.PRIORITY]: "",
    [fields.PRICE]: "",
    [fields.TEAM_MEMBER]: "",
    [fields.DESCRIPTION]: "",
    [fields.PIC]: "",
  });

  const validationSchema = Yup.object().shape({
    [fields.TITLE]: Yup.string().required(" Title required *"),
    [fields.PRIORITY]: Yup.string().required("Priority required *"),
    [fields.PRICE]: Yup.string().required("Price required"),
    [fields.TEAM_MEMBER]: Yup.array().min(1, "Team Member required"),
    [fields.DESCRIPTION]: Yup.string().required("Description required"),
    // [fields.PIC]: Yup.string().required('PIC required')
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log(values, ">>>>>>>>values");
    const response = await postData("project", {
      ...values,
      teamMember: values.teamMember.map((item) => item._id),
    });
    console.log(response, ">>>>>>>response")
    if(response?.status === 200 ){
      toast.success(response?.message ?? "Login successfully !.....");
    } else{
      toast.error(response?.message ?? "Something went wrong");
    }

  };

  const { formik, isError } = useCommonFormik(
    initialValues,
    onSubmit,
    validationSchema
  );

  return {
    formik,
    fields,
    setInitialValues,
    isError,
  };
};

export default useAddProjectFormik;
