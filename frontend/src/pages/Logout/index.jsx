import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

export default function Logout() {
    const signOut = useSignOut()
    const navigate = useNavigate()
    useEffect(() => {
        signOut()
        navigate('/login', { replace: true })
    })
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    You have been logged out.
                </h2>
            </div>
        </div>
    )
}
