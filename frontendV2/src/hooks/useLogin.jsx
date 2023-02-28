import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json() //contains jwt and email
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json)) //store email/jwt in local storage
            // update auth context
            dispatch({ type: 'LOGIN', payload: json }) // this goes to the context to set global state data

            setIsLoading(false)
        }

    }

    return { login, isLoading, error }
}