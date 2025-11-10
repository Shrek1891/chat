import useAxiosWithJWTInterceptor from "../helper/jwtinterceptor.ts";
import {API_URL} from "../config.ts";
import {useState} from "react";

interface IUseCrud<T> {
    data: T[];
    fetchData: () => Promise<void>;
    error: Error | null
    loading: boolean
}

const useCrud = <T>(initialData: T[], apiURL: string): IUseCrud<T> => {
    const jwtAxios = useAxiosWithJWTInterceptor()
    const [data, setData] = useState<T[]>(initialData)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await jwtAxios.get(`${API_URL}${apiURL}`, {})
            const data = response.data
            setData(data)
            setError(null)
            setLoading(false)
            return data
        } catch (error: any) {
            if (error.response && error.response.status == 400) {
                setError(new Error(error.response.data.message))
            }
            setLoading(false)
            throw error
        }
    }
    return {fetchData, data, error, loading}
}

export default useCrud
