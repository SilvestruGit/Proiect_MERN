import { createContext } from "react";
const AuthContext = createContext(
    {
        isLogedin: false,
        login: () => {},
        logout: () => {}
    }
);
export default AuthContext;