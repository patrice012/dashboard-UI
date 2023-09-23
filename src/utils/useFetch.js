import { useState, useEffect } from "react";

const useFetch = (url, params = { method: "GET" }) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, params, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

// const AsyncFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const abortCont = new AbortController();

//     fetch(url, { signal: abortCont.signal })
//       .then((res) => {
//         if (!res.ok) {
//           // error coming back from server
//           throw Error("could not fetch the data for that resource");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setIsPending(false);
//         setData(data);
//         setError(null);
//       })
//       .catch((err) => {
//         if (err.name === "AbortError") {
//           console.log("fetch aborted");
//         } else {
//           // auto catches network / connection error
//           setIsPending(false);
//           setError(err.message);
//         }
//       });

//     // abort the fetch
//     return () => abortCont.abort();
//   }, [url]);

//   return { data, isPending, error };
// };

// const makeFetch = (url, params) => {
//   const abortCont = new AbortController();

//   // const [data, setData] = useState(null);
//   // const [isPending, setIsPending] = useState(true);
//   // const [error, setError] = useState(null);

//   fetch(url, params, { signal: abortCont.signal })
//     .then((res) => {
//       console.log(res, params)
//       if (!res.ok) {
//         // error coming back from server
//         throw Error("could not fetch the data for that resource");
//       }
//       return res.json();
//     })
//     .then((data) => {
//       // setIsPending(false);
//       // setData(data);
//       // setError(null);
//       console.log(data, 'make fetch')
//       return data;
//     })
//     .catch((err) => {
//       if (err.name === "AbortError") {
//         console.log("fetch aborted");
//         abortCont.abort();
//       } else {
//         // auto catches network / connection error
//         // setIsPending(false);
//         // setError(err.message);
//         console.log(err)
//       }
//     });

//   // return { data, isPending, error };
// };

export { useFetch };
