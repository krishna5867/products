import React, { createContext, useState } from 'react'

export const Auth = createContext();

const AuthContext = ({ children }) => {
    const [userData, setUserData] = useState();

    return (
        <Auth.Provider value={{userData, setUserData}}>
            {children}
        </Auth.Provider>

    )
}

export default AuthContext
