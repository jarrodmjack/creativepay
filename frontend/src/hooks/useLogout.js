import { useAuthContext } from "./useAuthContext"
import { useTransactionsContext } from "./useTransactionsContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useTransactionsContext()

    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem('user')

        // dispatch logout to auth context
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_TRANSACTIONS', payload: null})
    }

    return { logout }

}