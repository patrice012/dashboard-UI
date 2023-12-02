import { createContext, useState } from "react";

const UsersListContext = createContext([]);

const UsersListProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [fetchData, setFetchData] = useState(false);

    const manageUsers = (data) => {
        setUsers(data)
    }

    return (
        <UsersListContext.Provider
            value={{ users, manageUsers, fetchData, setFetchData }}
        >
            {children}
        </UsersListContext.Provider>
    );
};

export {UsersListContext, UsersListProvider}