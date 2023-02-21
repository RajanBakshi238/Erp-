import { useAuth } from "../../context/AuthContext/context"
import { api } from "../../utils/api"

const useRefershToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = api.get('users/refresh', {
            withCredentials: true
        });

        setAuth(prev => ({
            ...prev,
            ...response?.data
        }))

        return response?.data?.accessToken;
    }
  return refresh;
}

export default useRefershToken