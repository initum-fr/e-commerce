import axios from 'axios'
import Input from '../../components/Input'
import Label from '../../components/Label'
import { Link, useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import GoBack from '../../components/GoBack'
import ImageUpload from '../../components/ImageUpload/index'

export default function CreateNewProduct() {
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        inStock: '',
        image: ''
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/category`)
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [])
    const authHeader = useAuthHeader()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const productData = Object.fromEntries(formData)
        
        productData.image = product.image;

        console.log(productData, authHeader)
        axios
            .post(`${import.meta.env.VITE_API_URL}/products`, productData, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                if (response.status === 201) navigate('../')
                else {
                    alert('Error: ' + response.data.message)
                }
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }

    return (
        <>
            <GoBack />
            <h2 className="mb-4 text-2xl font-bold">Create a new product</h2>
            <p className="text-gray-500">You can create a new product here.</p>
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
                                    required
                                    value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
                                    required
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <Label htmlFor="image" label="Product Image" />
                            <div className="mt-2">
                                <ImageUpload
                                    onImageUpload={(imageUrl) =>
                                        setProduct({
                                            ...product,
                                            image: imageUrl,
                                        })
                                    }
                                    currentImage={product.image}
                                />
                                {product.image && (
                                    <div className="mt-4">
                                        <div className="relative w-48 h-48 group">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-200 ease-in-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-lg" />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">Uploaded image</p>
                                    </div>
                                )}
                                <input 
                                    type="hidden" 
                                    name="image" 
                                    value={product.image} 
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
                                    placeholder="0.00"
                                    required
                                    step="0.01"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="category" label="Category" />
                            <div className="mt-2">
                                <select
                                    name="category"
                                    id="category"
                                    className="rounded-md border border-gray-300 px-3 py-2"
                                    value={product.category}
                                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
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
                            <Label htmlFor="inStock" label="Stock" />
                            <div className="mt-2">
                                <Input
                                    type="number"
                                    name="inStock"
                                    id="inStock"
                                    placeholder="0"
                                    required
                                    value={product.inStock}
                                    onChange={(e) => setProduct({ ...product, inStock: e.target.value })}
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
