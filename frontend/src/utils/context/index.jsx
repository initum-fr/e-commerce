import { useState, createContext } from 'react'

export const BagContext = createContext()

export const BagProvider = ({ children }) => {
    const [inBag, setInBag] = useState([])
    const emptyBag = () => {
        setInBag([])
    }
    const isBagEmpty = () => {
        return inBag.length <= 0
    }

    return (
        <BagContext.Provider value={{ inBag, emptyBag, setInBag, isBagEmpty }}>
            {children}
        </BagContext.Provider>
    )
}
