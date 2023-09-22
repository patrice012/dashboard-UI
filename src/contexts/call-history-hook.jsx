import { createContext, useState } from "react";
import { callEndpoint } from "../../server/endpoint";
import fetchData from "../utils/fetchData";
import { useEffect } from "react";

const CallHistoryContext = createContext();

function CallHistoryProvider({ children }) {
  const [histories, setHistory] = useState([]);
  // const [countSelection, setSelected] = useState(0);

  const endpoint = `${callEndpoint}`;

async function getData(endpoint) {
    try {
      const res = await fetchData(endpoint);
      return setHistory(res);
    } catch (err) {
      return console.log(err);
    }
  }

  // useEffect(() => {
  //   getData(endpoint);
  // }, [endpoint]);

  const removeHistory = (id) => {
    if (!id) {
      throw new Error("Id is missing...");
    }
    fetch(`${endpoint}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Object ${id} does not exists...`);
        }
        getData(endpoint);
        console.log(res, "delete succes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterHistory = (input) => {
    const filteredHistory = histories.filter(
      (history) => history.name === input
    );
    setHistory(filteredHistory);
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
    const new_objs = histories.filter((his) => his.id == id)
    new_objs['selected'] = !state;
    setHistory([...histories, ...new_objs]);
    console.log([...histories,...new_objs], "value");
  };

  return (
    <CallHistoryContext.Provider
      value={{
        histories,
        removeHistory,
        filterHistory,
        selectHistory,
        getData,
      }}
    >
      {children}
    </CallHistoryContext.Provider>
  );
}

export { CallHistoryProvider, CallHistoryContext };
