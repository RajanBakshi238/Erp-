import { useAuth } from "../../context/AuthContext/context";
import { api } from "../../utils/api";

const useRefershToken = () => {
  const { dispatch } = useAuth();

  const refresh = async () => {
    const response = await api.get("users/refresh", {
      withCredentials: true,
    });

    console.log({
        
        ...response?.data,
      })

    // setAuth((prev) => ({
    //   ...prev,
    //   ...response?.data?.data,
    // }));

    dispatch({
      type: "AUTH",
      auth: response?.data?.data
    })

    // setTimeout(() => {
      return response?.data?.accessToken;
    // }, 2000);
  };
  return refresh;
};

export default useRefershToken;
