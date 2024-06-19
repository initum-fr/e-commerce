import { useParams, useNavigate, Link } from 'react-router-dom'
import Label from '../../components/Label'
import Input from '../../components/Input'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GoBack from '../../components/GoBack'

export default function AdminProduct() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()

    const { productId } = useParams()

    // states
    const [product, setProduct] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response.data)
                delete response.data.password
                setProduct(response.data)
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
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('onSubmitNewInfos', product)
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/products/${productId}`,
                product,
                {
                    headers: { Authorization: authHeader },
                }
            )
            .then((response) => {
                if (response.status === 200) navigate('../')
                else {
                    alert('Error: ' + response.data.message)
                }
            })
            .catch((err) => {
                alert(err)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="mb-4 text-2xl font-bold">Edit a product</h1>
            <p className="text-gray-500">You can modify product information</p>
            <form className="w-full" onSubmit={(e) => onSubmit(e)}>
                <div className="space-y-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <Label htmlFor="name" label="Name" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Product Name"
                                    value={product.name}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <Label htmlFor="description" label="Description" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                    value={product.description}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="image" label="Image URL" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="image"
                                    id="image"
                                    placeholder="https://example.com/image.jpg"
                                    value={product.image}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            image: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="price" label="Price" />
                            <div className="mt-2">
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="100"
                                    value={product.price}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            price: e.target.value,
                                        })
                                    }
                                    step={0.01}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="category" label="Category" />
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    autoComplete="category"
                                    className="rounded-md border border-gray-300 px-3 py-2"
                                    value={product.category}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            category: e.target.value,
                                        })
                                    }
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="stock" label="Stock" />
                            <div className="mt-2">
                                <Input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    placeholder="100"
                                    value={product.inStock}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            inStock: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link
                        to="../"
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}
