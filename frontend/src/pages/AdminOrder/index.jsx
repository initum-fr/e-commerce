import { useParams, useNavigate, Link } from 'react-router-dom'
import Label from '../../components/Label'
import Input from '../../components/Input'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GoBack from '../../components/GoBack'

export default function AdminOrder() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()

    const { id } = useParams()

    // states
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response.data)
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }, [])
    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`${import.meta.env.VITE_API_URL}/orders/${id}`, data, {
                headers: { Authorization: authHeader },
            })
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
            <h1 className="mb-4 text-2xl font-bold">Edit an order</h1>
            <p className="text-gray-500">You can modify order information</p>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <form className="mt-8 w-full" onSubmit={(e) => onSubmit(e)}>
                    <div className="mt-3 overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Order ID
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <span className="disabled">
                                            {data._id}
                                        </span>
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={data.user.email}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    user: {
                                                        ...data.user,
                                                        email: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Address
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <Input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={data.shippingAddress.address}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    shippingAddress: {
                                                        ...data.shippingAddress,
                                                        address: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        City
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <Input
                                            type="text"
                                            name="city"
                                            id="city"
                                            value={data.shippingAddress.city}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    shippingAddress: {
                                                        ...data.shippingAddress,
                                                        city: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Postal Code
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <Input
                                            type="text"
                                            name="postalCode"
                                            id="postalCode"
                                            value={
                                                data.shippingAddress.postalCode
                                            }
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    shippingAddress: {
                                                        ...data.shippingAddress,
                                                        postalCode:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Country
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <Input
                                            type="text"
                                            name="country"
                                            id="country"
                                            value={data.shippingAddress.country}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    shippingAddress: {
                                                        ...data.shippingAddress,
                                                        country: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Payment State
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.isPaid ? 'Paid' : 'Not Paid'}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Delivery State
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {data.isDelivered
                                            ? 'Delivered'
                                            : 'Not Delivered'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="space-y-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3"></div>
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
            )}
        </>
    )
}
