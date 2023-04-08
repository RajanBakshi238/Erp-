import { useAuth } from "../../context/AuthContext/context";
import { api } from "../../utils/api";
import { useNavigate} from "react-router-dom"

const useRefershToken = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    console.log('dbgdhfgfdhfhgdhfgdhfgdhfghdfghdgfhdgfhdgfhfdh')
    let response;
    try {
      response = await api.get("users/refresh", {
        withCredentials: true,
      });

      dispatch({
        type: "AUTH",
        auth: response?.data?.data,
      });
      console.log(response?.data, "herere");
      return response?.data?.data?.accessToken;
    } catch (err) {
      console.log(err, "err of refresh token", err?.response?.data);
      dispatch({
        type: "AUTH",
        auth: {},
      });
      navigate("/login", { replace: true });

      

      return ""
    }

    // setAuth((prev) => ({
    //   ...prev,
    //   ...response?.data?.data,
    // }));

    // setTimeout(() => {

    // }, 2000);
  };
  return refresh;
};

export default useRefershToken;
