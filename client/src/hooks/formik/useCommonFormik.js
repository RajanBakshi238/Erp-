import { useFormik } from "formik";

const useCommonFormik = (initialValues, onSubmit, validationSchema) => {
  const formik = useFormik({
    enableReinitialize: true,
    ...(validationSchema ? { validationSchema } : {}),
    initialValues,
    onSubmit,
  });

  const isError = (name) => {
    return formik.errors?.[name] && formik.touched?.[name];
  };

  return { formik, isError };
};

export default useCommonFormik;
