import type {AuthServicesProps} from "../@types/auth-services";

export function useAuthService(): AuthServicesProps {
    const getUserDetails = async () => {
        const userId = localStorage.getItem("user_id")
        const  access_token = localStorage.getItem("token")
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
            });
            const data = await response.json();
            const {access: access_token, refresh: refresh_token} = data
            console.log(access_token, refresh_token)
            localStorage.setItem("token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("user_id", getUserIdFromToken(data.access))
            await getUserDetails()
            return data
        } catch (error) {
            return error
        }
    }
    return {
        login
    }
}