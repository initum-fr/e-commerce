import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
    if (
        isAuthenticated &&
        auth.user != undefined &&
        auth.user.role == 'admin'
    ) {
        return <Outlet />
    } else {
        return <Navigate to="/logout" />
    }
}
