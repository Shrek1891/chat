import useAuthServiceContext from "../context/AuthContext.tsx";
import {useState} from "react";
import useAxiosWithJWTInterceptor from "../helper/jwtinterceptor.ts";


const TestLogin = () => {
    const axios=useAxiosWithJWTInterceptor()
    const {login,isLogged,logout} = useAuthServiceContext()
    const [username, setUsername] = useState<string>("")
    const  getUserDetails = async() => {
        try {
            const userId = localStorage.getItem("user_id")
            const access_token = localStorage.getItem("token")
            const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`,
                },
            });

            setUsername(response.data.username)

        } catch (error) {
            return error
        }
    }


    return (
        <div>
            <h1>{isLogged ? "Logged In" : "Not Logged In"}</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={getUserDetails}>Get User Details</button>
            <h2>{username || ""}</h2>
        </div>
    );
};

export default TestLogin;