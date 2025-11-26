import {createContext, useContext} from "react";
import type {AuthServicesProps} from "../@types/auth-services";
import {useAuthService} from "../services/AuthServices.ts";

const AuthContext = createContext<AuthServicesProps | null>(null)

export const AuthContextProvider = ({children}: { children: React.ReactNode }) => {
    const authServices = useAuthService()
    return (
        <AuthContext.Provider value={authServices}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuthServiceContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthServiceContext must be used within an AuthContextProvider")
    }
    return context
}

export default useAuthServiceContext

