export interface AuthServicesProps {
    login: (username: string, password: string) => any;
    isLogged: boolean;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
    register: (username: string, password: string) => Promise<number>;
}