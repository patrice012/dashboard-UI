import { useState } from "react";

const useFetch = (url, { method, headers, body } = {}) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const request = () => {
        fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (res.status === 401) {
                    // navigate("/login", {
                    //     state: {
                    //         previousUrl: location.pathname,
                    //     },
                    // });
                    console.log("Not allowed!");
                } else if (!res.ok) {
                    // error coming back from server
                    throw res.status;
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
    };
    return { request, data, isPending, error };
};

export { useFetch };
