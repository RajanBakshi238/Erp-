import React, { useState } from "react";
import * as Yup from "yup";

import useCommonFormik from "./useCommonFormik";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";
import { createProject } from "src/services/projectService";

const useAddProjectFormik = () => {
  const fields = {
    TITLE: "title",
    PRIORITY: "priority",
    PRICE: "price",
    PRICE_TYPE: "priceType",
    STATUS: "status",
    PAYMENTS: "payments",
    PROJECT_PHASES: "projectPhases",
    TEAM_MEMBER: "teamMembers",
    PROJECT_MANAGERS: "projectManagers",
    DESCRIPTION: "description",
    PIC: "pic",
    PAYMENTS_ITEM: { description: "", amount: "", date: "" },
    PROJECT_PHASES_ITEM: { period: "", description: "", completionDate: "" },
  };

  const [initialValues, setInitialValues] = useState({
    [fields.TITLE]: "",
    [fields.PRIORITY]: "",
    [fields.PRICE]: "",
    [fields.TEAM_MEMBER]: [],
    [fields.DESCRIPTION]: "",
    [fields.PIC]: "",
    [fields.PRICE_TYPE]: "",
    [fields.STATUS]: "",
    [fields.PAYMENTS]: [fields.PAYMENTS_ITEM],
    [fields.PROJECT_PHASES]: [fields.PROJECT_PHASES_ITEM],
    [fields.PROJECT_MANAGERS]: [],
  });

  const validationSchema = Yup.object().shape({
    [fields.TITLE]: Yup.string().required(" Title required "),
    [fields.PRIORITY]: Yup.string().required("Priority required "),
    [fields.PRICE]: Yup.string().required("Price required "),
    [fields.TEAM_MEMBER]: Yup.array().min(1, "Team Member required "),
    [fields.PROJECT_MANAGERS]: Yup.array().min(1, "Project mangers required "),
    [fields.DESCRIPTION]: Yup.string().required("Description required "),
    [fields.PRICE_TYPE]: Yup.string().required("Price type required "),
    [fields.STATUS]: Yup.string().required("Status required"),
    [fields.PAYMENTS]: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().required("Description required"),
        amount: Yup.string().required("Amount required"),
        date: Yup.object().required("Date required"),
      })
    ),
    [fields.PROJECT_PHASES]: Yup.array().of(
      Yup.object().shape({
        period: Yup.object().required("Phase period required"),
        description: Yup.string().required("Phase description required"),
      })
    ),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log(values, ">>>>>>>>values");

    const response = await createProject({
      ...values,
      [fields.PAYMENTS]: values[fields.PAYMENTS].map((payment) => ({
        ...payment,
        date: payment.date.startDate,
      })),
      [fields.PROJECT_PHASES]: values[fields.PROJECT_PHASES].map((project) => ({
        ...project,
        completionDate: project.completionDate?.startDate ?? "",
      })),
    });

    // const response = await postData("project", {
    //   ...values,
    //   teamMember: values.teamMember.map((item) => item._id),
    // });
    console.log(response, ">>>>>>>response");
    if (response?.status === 200) {
      toast.success(response?.message ?? "Login successfully !.....");
    } else {
      toast.error(response?.message ?? "Something went wrong");
    }
    // formik.resetForm()
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
