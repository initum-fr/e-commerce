import axios from 'axios'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const navigations = [
    {
        name: 'Users',
        description: 'CRUD operations on users',
        to: 'users',
    },
    {
        name: 'Products',
        description: 'CRUD operations on products',
        to: 'products',
    },
    {
        name: 'Orders',
        description: 'CRUD operations on orders',
        to: 'orders',
    },
    {
        name: 'Categories',
        description: 'CRUD operations on categories',
        to: 'categories',
    },
]

export default function Admin() {
    const authHeader = useAuthHeader()
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .post(
                `${import.meta.env.VITE_API_URL}/auth/verify`,
                {},
                { headers: { Authorization: authHeader } }
            )
            .then((response) => {
                if (
                    response.data.role == undefined ||
                    response.data.role != 'admin'
                ) {
                    navigate('/logout', { replace: true })
                }
            })
            .catch(() => {
                navigate('/logout', { replace: true })
            })
    }, [])
    return (
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Dashbord - Admin
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    You can create, read, update, and delete data from the
                    database.
                </p>
            </div>
            <ul
                role="list"
                className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
                {navigations.map((nav, index) => (
                    <Link
                        key={index}
                        to={nav.to}
                        className="flex items-center justify-center gap-x-6 rounded-md bg-gray-600 px-3 py-7 text-white"
                    >
                        <div>
                            <h3 className="text-base font-semibold leading-7 tracking-tight">
                                {nav.name}
                            </h3>
                            <p className="text-sm leading-6">
                                {nav.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
