import axios from "axios";
import {API_URL} from "../config";
import {useNavigate} from "react-router-dom";

const API_BASE_URL = API_URL

const useAxiosWithJWTInterceptor = () => {
    const jwtAxios = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    })
    const navigate = useNavigate()
    jwtAxios.interceptors.response.use(
        (response) => {
            return response
        },
        async (error) => {
            if (error.response.status === 403) {
                navigate("/login")
            }
            throw error
        }
    )
    return jwtAxios
}

export default useAxiosWithJWTInterceptor


