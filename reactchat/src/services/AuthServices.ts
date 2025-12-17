import type {AuthServicesProps} from "../@types/auth-services";
import {useState} from "react";
import {API_URL} from "../config.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as console from "node:console";

export function useAuthService(): AuthServicesProps {
    const navigate = useNavigate()
    const getInitialLoggedInValue = () => {
        const loggedIn = localStorage.getItem("isLoggedId")
        return loggedIn !== null && loggedIn !== "true"
    }
    const [isLogged, setIsLoggedIn] = useState<boolean>(getInitialLoggedInValue)
    const getUserDetails = async () => {
        const userId = localStorage.getItem("user_id")
        const access_token = localStorage.getItem("token")
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },

            });
            const data = await response.json();
            localStorage.setItem("user", data)
            setIsLoggedIn(true)
            return data
        } catch (error) {
            return error
        }
    }

    const getUserIdFromToken = (token: string) => {
        const tokenParts = token.split(".")
        const encodePayload = tokenParts[1]
        const decodePayload = atob(encodePayload)
        const payload = JSON.parse(decodePayload)
        return payload.user_id

    }
    const login = async (username: string, password: string) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });
            const data = await response.json();
            const {access: access_token, refresh: refresh_token} = data
            localStorage.setItem("token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("user_id", getUserIdFromToken(data.access))
            localStorage.setItem("isLoggedId", isLogged.toString())
            await getUserDetails()
            setIsLoggedIn(true)
            return data
        } catch (error) {
            setIsLoggedIn(false)
            localStorage.setItem("isLoggedId", isLogged.toString())
            return error
        }
    }
    const refreshAccessToken = async () => {
        try {
            await axios.post(`${API_URL}/token/refresh/`, {}, {withCredentials: true})
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const logout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("isLoggedId")
        setIsLoggedIn(false)
        navigate("/login")
        try {
            await axios.post(`${API_URL}/logout/`, {}, {withCredentials: true})
        } catch (error) {
            return Promise.reject(error)

        }
    }
    const register = async (username: string, password: string) => {
        console.log(username, password)
        try {

            const res =await fetch("http://127.0.0.1:8000/api/register/",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({username,password}),
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register/", {
                    username,
                    password,
                }, {withCredentials: true}
            );
            return response.status
        } catch (err: any) {
            return err.response.status;
        }
    }

    return {
        login,
        isLogged,
        logout,
        refreshAccessToken,
        register
    }
}