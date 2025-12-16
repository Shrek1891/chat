import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import useAuthServiceContext from "../context/AuthContext.tsx";
import {Container, Box, Typography, TextField, Button} from "@mui/material";


const Login = () => {
    const {login} = useAuthServiceContext()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: (values) => {
            const errors: Partial<typeof values> = {}
            if (!values.username) {
                errors.username = "Required";
            }
            if (!values.password) {
                errors.password = "Required";
            }
            return errors;
        },
        onSubmit: async (values) => {
            const {username, password} = values
            const user = await login(username, password)
            if (user.status === 401) {
                console.log("Invalid username or password")
                formik.setErrors({
                    username: "Invalid username or password",
                    password: "Invalid username or password"
                })
            } else {
                navigate("/")
            }
            if (!user) {
                navigate("/")
            } else {
                navigate("/test-login")
            }
        }
    })
    return (
        <Container
            component="main"
            maxWidth={"xs"}
        >
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <Typography
                    variant="h5"
                    noWrap
                    component="h1"
                    sx={{
                        fontWeight: 500,
                        pb: 2,
                    }}
                >
                    Sign in
                </Typography>
                <Box onSubmit={formik.handleSubmit} component={"form"} sx={{mt: 1}}>
                    <TextField
                        autoFocus
                        fullWidth
                        label="username"
                        id="username"
                        type="text"
                        name="username"
                        error={!!formik.touched.username && !!formik.errors.username}
                        helperText={formik.errors.username}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    ></TextField>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="password"
                        type="password"
                        name="password"
                        label="password"
                        error={!!formik.touched.password && !!formik.errors.password}
                        helperText={formik.errors.password}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    ></TextField>
                    <Button
                        variant="contained"
                        disableElevation
                        type="submit"
                        sx={{mt: 1, mb: 2}}

                    >Next</Button>
                </Box>
            </Box>
        </Container>

    )
        ;
};

export default Login;
