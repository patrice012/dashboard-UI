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

  const updateHistory = (id) => {
    const url = `${endpoint}/${id}`;
    const res = fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    if (!res.ok) throw new Error('Server error...')
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
        updateHistory,
      }}
    >
      {children}
    </CallHistoryContext.Provider>
  );
}

export { CallHistoryProvider, CallHistoryContext };
