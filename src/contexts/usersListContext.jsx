import { createContext, useState } from "react";

const UsersListContext = createContext();

const UsersListProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const manageUsers = (data) => {
        setUsers(data)
    }

    return (
        <UsersListContext.Provider value={{ users, manageUsers }}>
            {children}
        </UsersListContext.Provider>
    );
};

export {UsersListContext, UsersListProvider}