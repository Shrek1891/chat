import useAuthServiceContext from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const {isLogged} = useAuthServiceContext()
    if (!isLogged) {
        return <Navigate to="/login" replace/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedRoute
