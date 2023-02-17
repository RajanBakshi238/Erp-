import { toast } from "react-toastify";
const useToast = () => {
  const toastSuccess = (msg) => {
    return toast.success(msg);
  };

  const toastFail = (msg) => {
    return toast.fail(msg);
  };

  return {
    toastSuccess,
    toastFail,
  };
};

export default useToast;
