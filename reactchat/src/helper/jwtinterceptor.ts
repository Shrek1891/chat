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
            const originalRequest = error.config
            if (error.response.status === 403 || error.response.status === 401) {
                axios.defaults.withCredentials = true
                const refreshToken = localStorage.getItem("refresh_token")
                if (!refreshToken) {
                    navigate("/login")
                    throw error
                }
                const response = await axios.post(`http://127.0.0.1:8000/api/token/refresh/`, {
                    refresh: refreshToken,
                })
                localStorage.setItem("token", response.data.access)
                originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`
                return jwtAxios(originalRequest)
            }
            throw error
        }
    )
    return jwtAxios
}

export default useAxiosWithJWTInterceptor


