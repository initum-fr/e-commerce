// react
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
// axios
import axios from 'axios'
import GoBack from '../../components/GoBack'
import Dropdown from '../../components/Dropdown'
import {
    CheckBadgeIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/solid'

export default function AdminOrders() {
    const authHeader = useAuthHeader()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/orders`)
            .then((res) => {
                setOrders(res.data)
                setLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }, [])

    const onDelete = (order) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/orders/${order._id}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response)
                setOrders(orders.filter((c) => c._id !== order._id))
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="mb-4 text-2xl font-bold">Admin Orders</h1>
            <p className="text-gray-500">
                List of all orders in the admin panel.
            </p>
            <div className="mt-8 overflow-hidden overflow-x-auto border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                ID
                            </th> */}
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Created at
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Address
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                City
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Postal Code
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Country
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Payment State
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                Delivery State
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
                            orders.map((order) => (
                                <>
                                    <tr key={order._id}>
                                        {/* <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {order._id}
                                            </div>
                                        </td> */}
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.createdAt}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.user.email}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.shippingAddress.address}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.shippingAddress.city}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {
                                                    order.shippingAddress
                                                        .postalCode
                                                }
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.shippingAddress.country}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.isPaid ? (
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {order.isDelivered ? (
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                                )}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Dropdown
                                                options={[
                                                    {
                                                        to: `${order._id}`,
                                                        label: 'Edit',
                                                        onclick: '',
                                                    },
                                                    {
                                                        to: '',
                                                        label: 'Delete',
                                                        onclick: () =>
                                                            onDelete(order),
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
                Add Order
            </Link>
        </>
    )
}
