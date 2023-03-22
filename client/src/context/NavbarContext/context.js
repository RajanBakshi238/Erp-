import { createContext, useContext, useState } from "react";

export const NavbarContext = createContext();

const NavbarProvider = ({children}) => {
    const {fullNav, setFullNav} =useState(true);

    return (
        <NavbarContext.Provider value={{fullNav, setFullNav}}>
            {children}
        </NavbarContext.Provider>
    )
}

export const useNavbar = () => {
    return useContext(NavbarContext)
}

export default NavbarProvider;