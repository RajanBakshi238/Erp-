import axios from 'axios'
import React, {useEffect} from 'react'

import { api } from '../../utils/api'
import {useAuth} from "./../../context/AuthContext/context"
import useRefershToken from './useRefershToken'


const useAxiosPrivate = () => {

    const refresh = useRefershToken();
    const { authObj} = useAuth();
    
    

    useEffect(() => {
        




        console.log("runned useAxios request ..........")
        const requestIntercept = api.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${authObj?.auth?.accessToken}`; 
                }

                return config;
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = api.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(prevRequest);
                }

                return Promise.reject(error);
            }
        )

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }

    }, [authObj, refresh])
    // }, [])
    
    return ;
}

export default useAxiosPrivate