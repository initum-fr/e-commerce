// react
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
// axios
import axios from 'axios'
import GoBack from '../../components/GoBack'

export default function AdminCategories() {
    const authHeader = useAuthHeader()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get('http://localhost:8000/category')
            .then((res) => {
                setCategories(res.data)
                setLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }, [])

    const onDelete = (category) => {
        axios
            .delete(`http://localhost:8000/category/${category._id}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response)
                setCategories(categories.filter((c) => c._id !== category._id))
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="mb-4 text-2xl font-bold">Admin Categories</h1>
            <p className="text-gray-500">
                List of all categories in the admin panel.
            </p>
            <div className="mt-8 overflow-hidden overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
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
                                Name
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
                            categories.map((category) => (
                                <>
                                    <tr key={category._id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {category._id}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {category.name}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <Link
                                                    to={`${category._id}`}
                                                    className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        onDelete(category)
                                                    }
                                                    className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Link
                to="create"
                className="float-right mr-10 mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
                Add Category
            </Link>
        </>
    )
}
