import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import useAuthServiceContext from "../context/AuthContext.tsx";


const Login = () => {
    const {login} = useAuthServiceContext()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            const {username, password} = values
            const user = await login(username, password)
            if (!user) {
                navigate("/")
            } else {
                console.log("user" + user)
            }
        }
    })
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <label>password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
