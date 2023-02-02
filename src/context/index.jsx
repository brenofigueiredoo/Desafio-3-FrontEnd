import { createContext, useState } from "react";

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(
        () => localStorage.getItem("authToken") || ""
      );

    const [user, setUser] = useState()
    const [isModal, setIsModal] = useState(false)
    const [isModalAdd, setIsModalAdd] = useState(false)
    const [idContact, setIdContact] = useState()

    return (
        <Context.Provider value={{
            authToken,
            setAuthToken,
            setUser,
            user,
            setIsModal,
            isModal,
            setIdContact,
            idContact,
            setIsModalAdd,
            isModalAdd
        }}>
            {children}
        </Context.Provider>
    )
}