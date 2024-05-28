import axios from "axios";
import Input from "../../components/Input";
import Label from "../../components/Label";
import { Link, useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"


export default function CreateNewProduct() {
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = Object.fromEntries(formData);
        console.log(productData, authHeader)
        axios.post(`http://localhost:8000/products`, productData, { headers: { Authorization: authHeader } })
            .then((response) => {
                if (response.status === 201)
                    navigate('../')
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

            <h2 className="text-2xl font-bold mb-4">Create a new user</h2>
            <p className="text-gray-500">You can create a new user here.</p>
            <form className="w-full" onSubmit={e => onSubmit(e)}>
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
                                    required
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
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="category" label="Category" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="Category"
                                    required
                                />
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
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to="../" type="button" className="text-sm font-semibold leading-6 text-gray-900">
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