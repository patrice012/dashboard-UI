import { createContext } from "react";
import { useState } from "react";


const UserContext = createContext({
  "name": undefined,
  "country": "United States",
  "flag": "/src/assets/flag.png",
  "profil_img": undefined,
  "language": undefined,
  "occupation": undefined,
  "objective": undefined,
  "subscription": undefined,
})


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

export {UserProvider, UserContext};