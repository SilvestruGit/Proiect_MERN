import { createContext } from "react";
const AuthContext = createContext(
    {
        isLogedin: false,
        userId: null,
        login: () => {},
        logout: () => {}
    }
);
export default AuthContext;