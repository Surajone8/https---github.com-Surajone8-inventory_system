import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    const setCurrentUser = (currentUser) => {
        setUser(currentUser);
    }

    const logOutUser = (currentUser) => {
        setUser(null);
    }


    return (
        <UserContext.Provider value={{ user, setCurrentUser, logOutUser }}>
            {children}
        </UserContext.Provider>
    )
}



export { UserContext, UserProvider };