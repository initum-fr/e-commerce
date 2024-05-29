// react
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// react-auth-kit
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"

// axios
import axios from "axios"
import GoBack from "../../components/GoBack"

export default function AdminProducts() {
    const authHeader = useAuthHeader()

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/products', { headers: { Authorization: authHeader } })
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })

        axios.get('http://localhost:8000/category')
            .then((res) => {
                setCategories(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const onDelete = (product) => {
        axios.delete(`http://localhost:8000/products/${product._id}`, { headers: { Authorization: authHeader } })
            .then(response => {
                console.log(response)
                setProducts(products.filter((p) => p._id !== product._id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
            <p className="text-gray-500">List of all products in the admin panel.</p>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? <h1>Loading...</h1> : products.map((product) => (
                            <>

                                < tr key={product._id} >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product._id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.image ? <img src={product.image} alt={product.name} className="h-20 w-20 rounded-full" /> : <img src="https://via.placeholder.com/150" alt={product.name} className="h-20 w-20 rounded-full" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.price}€</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {categories.map((category) => (
                                                category._id == product.category && (
                                                    category.name
                                                )
                                            ))}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.inStock}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Link to={`${product._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Edit
                                            </Link>
                                            <button onClick={() => onDelete(product)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
                Add Product
            </Link>

        </>
    )
}