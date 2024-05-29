// react
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// react-auth-kit
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"

// axios
import axios from "axios"

// design imports
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import GoBack from "../../components/GoBack"

export default function AdminUsers() {
    const authHeader = useAuthHeader()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/users', { headers: { Authorization: authHeader } })
            .then((res) => {
                setUsers(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    const onDelete = (user) => {
        axios.delete(`http://localhost:8000/users/${user._id}`, { headers: { Authorization: authHeader } })
            .then(response => {
                console.log(response)
                setUsers(users.filter((u) => u._id !== user._id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="text-2xl font-bold mb-4">Admin Users</h1>
            <p className="text-gray-500">List of all users in the admin panel.</p>
            <div className="shadow scroll-m-0 border-b border-gray-200 sm:rounded-lg mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                First name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Admin
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? <h1>Loading...</h1> : users.map((user) => (

                            <tr key={user.email} >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user._id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.firstname}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.lastname}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {user.admin ?
                                            <CheckCircleIcon className="size-6 text-green-800" />
                                            :
                                            <XCircleIcon className="size-6 text-red-800" />
                                        }</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Link to={`${user._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => onDelete(user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            <Link to="create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right mt-4 mr-10">
                Add User
            </Link>
        </>
    )
}