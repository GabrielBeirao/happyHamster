// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


// import React, { createContext, useState, useContext } from 'react';
// //import createContext from './createContext';

// const initialState = {}

// const reducer = (state, action) => {
//   switch(action.type){
//     default:
//     return state
//   }
// }

// const teste = (dispatch) => {
//   return (args) => {
//     console.log("teste")
//   }
// }

// export const { Context, Provider } = createContext(
//   reducer, 
//   {teste}, 
//   initialState
//   )

  

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
