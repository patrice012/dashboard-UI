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

  // const updateHistory = (id, data) => {
  //   console.log(data)
  //   const url = `${endpoint}/${id}`;
  //   const res = fetch(url, {
  //     method: "PUT",
  //     body: JSON.stringify({data}),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //   if (!res.ok) console.log(res, 'wrror')
  //   // return res.json()
  // };


  const updateHistory = (id, updatedUser) => {
    const url = `${endpoint}/${id}`;

    // Make a PUT request to update the user data
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(updatedUser), // Send the updated user object
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Error updating user:", res);
          // Handle error here if needed
        } else {
          console.log("User updated successfully!");
          // You can trigger a UI update here if needed
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        // Handle error here if needed
      });
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
