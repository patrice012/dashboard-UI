import { createContext, useState } from "react";
import { callEndpoint } from "../../server/endpoint";


const CallHistoryContext = createContext();

function CallHistoryProvider({ children }) {
  const [histories, setHistory] = useState([]);
  const endpoint = `${callEndpoint}`;

  const createUser = async (endpoint, data) => {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    if (!res.ok ) throw new Error("Server error...")
    return res.json()
  };

  const updatedUser =  async (url, data) => {
    console.log(data)
    // const url = `${endpoint}/${id}`;
      const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
      if (!res.ok) {
        throw new Error("Failed to update user.");
      }
    return res.json()
  };



  const deleteHistory = async (id) => {
    console.log(id, 'id')
    const url = `${endpoint}/${id}`;
    if (!id) {
      throw new Error("Id is missing...");
    }
    const res = await fetch(url, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Server error...");
  };

  return (
    <CallHistoryContext.Provider
      value={{
        histories,
        deleteHistory,
        createUser,
        updatedUser,
      }}
    >
      {children}
    </CallHistoryContext.Provider>
  );
}

export { CallHistoryProvider, CallHistoryContext };
