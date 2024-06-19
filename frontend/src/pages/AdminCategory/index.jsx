import { useParams, useNavigate, Link } from 'react-router-dom'
import Label from '../../components/Label'
import Input from '../../components/Input'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GoBack from '../../components/GoBack'

export default function AdminCategory() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()

    const { categoryId } = useParams()

    // states
    const [category, setCategory] = useState({})

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/category/${categoryId}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response.data)
                setCategory(response.data)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/category/${categoryId}`,
                category,
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
            <h1 className="mb-4 text-2xl font-bold">Edit a category</h1>
            <p className="text-gray-500">You can modify category information</p>
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
                                    placeholder="Category Name"
                                    value={category.name}
                                    onChange={(e) =>
                                        setCategory({
                                            ...category,
                                            name: e.target.value,
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
