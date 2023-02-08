import {useFormik} from "formik";

const useCommonFormik = (initialValues, onSubmit, validationSchema) => {
  const formik = useFormik({
    enableReinitialize: true,
    ...(validationSchema ? {validationSchema} : {}),
    initialValues,
    onSubmit,
  });

  return formik;
};

export default useCommonFormik;
