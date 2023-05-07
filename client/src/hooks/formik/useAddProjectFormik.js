import React, {useState} from 'react'
import * as Yup from "yup";


import useCommonFormik from './useCommonFormik'

const useAddProjectFormik = () => {
    const fields = {
        TITLE: "title",
        PRIORITY: "priority",
        PRICE: "price",
        TEAM_MEMBER: "team_member",
        DESCRIPTION: "description",
        PIC: "pic"
    }

    const [initialValues, setInitialValues] = useState({
      [fields.TITLE]: "",
      [fields.PRIORITY]: "",
      [fields.PRICE]: "",
      [fields.TEAM_MEMBER]: "",
      [fields.DESCRIPTION]: "",
      [fields.PIC]: ""
    })

    const validationSchema = Yup.object().shape({
      [fields.TITLE]: Yup.string().required(" Title required *"),
      [fields.PRIORITY]: Yup.string().required("Priority required *"),
      [fields.PRICE]: Yup.string().required("Price required"),
      [fields.TEAM_MEMBER]: Yup.string().required('Team Member required'),
      [fields.DESCRIPTION]: Yup.string().required('Description required'),
      // [fields.PIC]: Yup.string().required('PIC required')
    })

    const onSubmit = async (values, {resetForm}) => {
      console.log(values, ">>>>>>>>values")
    }

    const {formik, isError} = useCommonFormik(initialValues, onSubmit, validationSchema);

    return {
      formik,
      fields,
      setInitialValues,
      isError
    }
}

export default useAddProjectFormik