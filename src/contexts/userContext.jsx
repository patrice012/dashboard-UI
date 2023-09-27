import { createContext } from "react";


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


export default UserContext;