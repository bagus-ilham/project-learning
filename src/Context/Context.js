import { createContext, useContext, useReducer } from "react";
import { AuthReducer, InitialState } from "./Reducer";

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export const useAuthState = () => {
    const context = useContext(AuthStateContext)
    if ( context === undefined) {
        throw new Error('useAuthDispatch must be used within AuthProvider')
    } 
    return context
}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext)
    if ( context === undefined) {
        throw new Error('useAuthDispatch must be used within AuthProvider')
    }
    return context
}


export const AuthProvider = ({children}) => {
    const [layout, dispatch] = useReducer(AuthReducer, InitialState)
    return (
        <AuthStateContext.Provider value={layout}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}