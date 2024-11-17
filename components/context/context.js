import React, { createContext, useState } from "react";

export const HomeTabContext = createContext();

export const HomeTabProvider = (props) => {
    const [showTab, setShowTab] = useState(true);
    return (
        <HomeTabContext.Provider value={
            {
                showTab,
                setShowTab,
            }
        }>
            {props.children}
        </HomeTabContext.Provider>
    )
}