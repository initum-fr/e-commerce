import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    const isAuthenticated = useIsAuthenticated()
    if (isAuthenticated) {
        return (<Outlet />)
    }
    else {
        return (<Navigate to='/login' />)
    }
}