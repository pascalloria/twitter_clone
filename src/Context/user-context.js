import React from "react"


// Création

export const UserContext= React.createContext()

// Creer le provider

const UserContextProvider = (props) => {   
   
    return (
        <UserContext.Provider value={props.user}>
            {props.children}
        </UserContext.Provider>
    );
            
}


// Creer le consumer 

export default UserContextProvider
