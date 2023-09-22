import { createContext, useState } from "react";
import { callEndpoint } from "../../server/endpoint";
import fetchData from "../utils/fetchData";
import { useEffect } from "react";



const CallHistoryContext = createContext();

function CallHistoryProvider({ children }) {
  const [histories, setHistory] = useState([]);

    const endpoint = `${callEndpoint}`;

    useEffect(() => {
      fetchData(endpoint)
        .then((res) => setHistory(res))
        .catch((err) => console.log(err));
    }, [endpoint]);


// const removeHistory = (id) => {
    
// }

  return (
    <CallHistoryContext.Provider value={{ histories }}>
      {children}
    </CallHistoryContext.Provider>
  );
}

export { CallHistoryProvider, CallHistoryContext };
