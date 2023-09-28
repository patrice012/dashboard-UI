import { createContext } from "react";
import { useState } from "react"


const UIFeedBackContext = createContext({
    "state": false,
    "message": null
})

const UIFeedBackProvider = ({children}) => {
    const [feedBack, setFeedBack] = useState({
        "state": false,
        "message": null
    })

    const showFeedBack = (message) => {
        const timer = 5000 // 5s
        // show action confirmaton
        setFeedBack({
            "state": true,
            "message": message
        })
        // hide modal after 5s and reset modal's message
        setTimeout(() => {
            setFeedBack({
                "state": false,
                "message": null
            })
        }, timer)
    }

    return (
        <UIFeedBackContext.Provider value={{feedBack,showFeedBack}}>
            {children}
        </UIFeedBackContext.Provider>
    )
}

export {UIFeedBackProvider, UIFeedBackContext}