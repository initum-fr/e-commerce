// react
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// react-auth-kit
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

// axios
import axios from 'axios'

// design imports
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import GoBack from '../../components/GoBack'
import Dropdown from '../../components/Dropdown'

export default function AdminUsers() {
    const authHeader = useAuthHeader()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/users`, {
                headers: { Authorization: authHeader },
            })
            .then((res) => {
                setUsers(res.data)
                setLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    })

    const onDelete = (user) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response)
                setUsers(users.filter((u) => u._id !== user._id))
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="mb-4 text-2xl font-bold">Admin Users</h1>
            <p className="text-gray-500">
                List of all users in the admin panel.
            </p>
            <div className="mt-8 scroll-m-0 overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                First name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Last name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Admin
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {loading ? (
                            <h1>Loading...</h1>
                        ) : (
                            users.map((user) => (
                                <tr key={user.email}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {user._id}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {user.firstname}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-500">
                                            {user.lastname}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {user.admin ? (
                                                <CheckCircleIcon className="size-6 text-green-800" />
                                            ) : (
                                                <XCircleIcon className="size-6 text-red-800" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Dropdown
                                            options={[
                                                {
                                                    to: `${user._id}`,
                                                    label: 'Edit',
                                                    onclick: '',
                                                },
                                                {
                                                    to: '',
                                                    label: 'Delete',
                                                    onclick: () =>
                                                        onDelete(user),
                                                },
                                            ]}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Link
                to="create"
                className="float-right mt-4 rounded bg-green-800 px-4 py-2 font-bold text-white hover:bg-green-900"
            >
                Create a new user
            </Link>
        </>
    )
}
