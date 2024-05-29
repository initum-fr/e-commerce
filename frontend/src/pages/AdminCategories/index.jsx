// react
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
// axios
import axios from "axios"
import GoBack from "../../components/GoBack"

export default function AdminCategories() {
    const authHeader = useAuthHeader()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/category')
            .then((res) => {
                setCategories(res.data)
                setLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)

            })
    }, [])

    const onDelete = (category) => {
        axios.delete(`http://localhost:8000/category/${category._id}`, { headers: { Authorization: authHeader } })
            .then(response => {
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
            <h1 className="text-2xl font-bold mb-4">Admin Categories</h1>
            <p className="text-gray-500">List of all categories in the admin panel.</p>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? <h1>Loading...</h1> : categories.map((category) => (
                            <>

                                < tr key={category._id} >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{category._id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Link to={`${category._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Edit
                                            </Link>
                                            <button onClick={() => onDelete(category)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>

            </div >
            <Link to="create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded float-right mt-4 mr-10">
                Add Category
            </Link>

        </>
    )
}