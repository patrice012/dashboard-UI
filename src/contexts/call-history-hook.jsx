import { createContext, useState } from "react";
import { callEndpoint } from "../../server/endpoint";
import fetchData from "../utils/fetchData";
// import { useEffect } from "react";

import { useFetch } from "../utils/useFetch";

const CallHistoryContext = createContext();

function CallHistoryProvider({ children }) {
  const [histories, setHistory] = useState([]);
  // const [countSelection, setSelected] = useState(0);

  const endpoint = `${callEndpoint}`;

  // async function getData(endpoint) {
  //   try {
  //     const res = await fetchData(endpoint);
  //     return setHistory(res);
  //   } catch (err) {
  //     return console.log(err);
  //   }
  // }

  const creaeHistory = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setHistory([...histories, json]));
  };
  const updateHistory = () => {
    const url = `${endpoint}/${id}`;
    fetch(url, {
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
      .then((response) => response.json())
      .then((json) => setHistory([...histories, json]));
  };

  const removeHistory = (id) => {
    const url = `${endpoint}/${id}`;
    if (!id) {
      throw new Error("Id is missing...");
    }
    fetch(url, {
      method: "DELETE",
    });
    // const endpoint = `${userEndpoint}/1`;
    const { data: histories } = fetch(endpoint).then(r => r.json());
    setHistory([histories])
  };

  const filterHistory = (input) => {
    const url = `${endpoint}/${input}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {setHistory([json]);});
    // setHistory(filteredHistory);
  };

  const selectHistory = (state, id) => {
    console.log(state, "before");
    console.log(!state, "ah=f");

    // console.log(!state);
    // const data = {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     selected: !state,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // };
    // fetch(`${endpoint}/${id}`, data)
    //   .then((res) => {
    //     if (res.ok) return !state;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const new_objs = histories.filter((his) => his.id == id);
    new_objs["selected"] = !state;
    setHistory([...histories, ...new_objs]);
    console.log([...histories, ...new_objs], "value");
  };

  return (
    <CallHistoryContext.Provider
      value={{
        histories,
        removeHistory,
        filterHistory,
        selectHistory,
        creaeHistory,updateHistory
      }}
    >
      {children}
    </CallHistoryContext.Provider>
  );
}

export { CallHistoryProvider, CallHistoryContext };
