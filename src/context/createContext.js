/*import react, { useReducer } from "react";

export default (reducer, action, initialValue) => {
     const Context = React.createContext()

     const Provider = ({children}) => {
        const [state, dispatch] = useReducer(
            reducer,
            initialValue
        )

        const customFunctions = {}
        Object.keys(actions).forEach(
            (key) =>
                (customFunction[key] = action[key](dispatch))
        )
    
        return(
            <Context.Provider
                value={{ state, ...customFunctions }}
            >
                {children}
            </Context.Provider>
        )


    }
    return { Context, Provider }
    
}

*/