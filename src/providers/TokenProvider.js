import decode from 'jwt-decode';
import { createContext, useContext } from 'react';

export const TokenContext = createContext();

const ACCESS_TOKEN_KEY = 'impladent_access_token_v2';

export default function TokenProvider({ children }) {
    const clearToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
    const setToken = (value) => localStorage.setItem(ACCESS_TOKEN_KEY, value);
    const token = getToken();
    return (
        <TokenContext.Provider value={{ token, setToken, clearToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export function getToken() {
    if (typeof window !== 'undefined' && localStorage.getItem(ACCESS_TOKEN_KEY)) {
        if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
            return decode(localStorage.getItem(ACCESS_TOKEN_KEY));
        }
    }
}

export function setToken(value) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(ACCESS_TOKEN_KEY, value)
    }
}

export function useToken() {
    return useContext(TokenContext);
}