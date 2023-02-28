import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem('user')

        // dispatch logout to auth context
        dispatch({type: 'LOGOUT'})
    }

    return { logout }

}