import UserContext from "../contexts/userContext";
import { useState } from "react";

const UserProvider = ({children}) => {
    const [user, setUser]  = useState({
      "name": undefined,
      "country": "United States",
      "flag": "/src/assets/flag.png",
      "profil_img": undefined,
      "language": undefined,
      "occupation": undefined,
      "objective": undefined,
      "subscription": undefined,
    })
  
    const manageUser = (data) => {
      setUser(data)
  
    }
  
    return (
      <UserContext.Provider value={{user, manageUser}}>
        {children}
      </UserContext.Provider>
    )
  }

export default UserProvider;