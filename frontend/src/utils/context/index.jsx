import { useState, createContext } from 'react'

export const BagContext = createContext()

export const BagProvider = ({ children }) => {
    const [inBag, setInBag] = useState([])
    const emptyBag = () => {
        setInBag([])
    }

    return (
        <BagContext.Provider value={{ inBag, emptyBag, setInBag }}>
            {children}
        </BagContext.Provider>
    )
}
