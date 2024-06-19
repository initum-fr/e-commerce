// react
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// react-auth-kit
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

// axios
import axios from 'axios'
import GoBack from '../../components/GoBack'
import Dropdown from '../../components/Dropdown'

export default function AdminProducts() {
    const authHeader = useAuthHeader()

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/products`, {
                headers: { Authorization: authHeader },
            })
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })

        axios
            .get(`${import.meta.env.VITE_API_URL}/category`)
            .then((res) => {
                setCategories(res.data)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }, [])

    const onDelete = (product) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/products/${product._id}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
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
            <h1 className="mb-4 text-2xl font-bold">Admin Products</h1>
            <p className="text-gray-500">
                List of all products in the admin panel.
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
                                Image
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
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Stock
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
                            products.map((product) => (
                                <>
                                    <tr key={product._id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {product._id}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap py-5">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-20 w-20 rounded-full"
                                                />
                                            ) : (
                                                <img
                                                    src="https://via.placeholder.com/150"
                                                    alt={product.name}
                                                    className="h-20 w-20 rounded-full"
                                                />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {product.description}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {product.price}€
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {categories.map(
                                                    (category) =>
                                                        category._id ==
                                                            product.category &&
                                                        category.name
                                                )}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {product.inStock}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Dropdown
                                                options={[
                                                    {
                                                        to: `${product._id}`,
                                                        label: 'Edit',
                                                        onclick: '',
                                                    },
                                                    {
                                                        to: '',
                                                        label: 'Delete',
                                                        onclick: () =>
                                                            onDelete(product),
                                                    },
                                                ]}
                                            />
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
                Add Product
            </Link>
        </>
    )
}
