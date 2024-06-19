import { useParams, useNavigate, Link } from 'react-router-dom'
import Label from '../../components/Label'
import Input from '../../components/Input'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GoBack from '../../components/GoBack'

export default function AdminUser() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()

    const { userId } = useParams()

    // states
    const [userInformations, setUserInformations] = useState({})

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                headers: { Authorization: authHeader },
            })
            .then((response) => {
                console.log(response.data)
                delete response.data.password
                setUserInformations(response.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [])
    const onSubmitNewInfos = (e) => {
        e.preventDefault()
        console.log('onSubmitNewInfos', userInformations)
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/users/${userId}`,
                userInformations,
                {
                    headers: { Authorization: authHeader },
                }
            )
            .then(() => {
                navigate('../')
            })
            .catch((error) => {
                alert('Error: ' + error.response.data.message)
            })
    }
    return (
        <>
            <GoBack />
            <h1 className="mb-4 text-2xl font-bold">Edit an user</h1>
            <p className="text-gray-500">You can modify user information</p>
            <form className="w-full" onSubmit={(e) => onSubmitNewInfos(e)}>
                <div className="space-y-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <Label htmlFor="first-name" label="First name" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    placeholder="John"
                                    value={userInformations.firstname}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            firstname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <Label htmlFor="last-name" label="Last name" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    placeholder="Doe"
                                    value={userInformations.lastname}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            lastname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <Label htmlFor="email" label="Email address" />
                            <div className="mt-2">
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email@example.com"
                                    value={userInformations.email}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="admin" label="Role" />
                            <div className="mt-2">
                                <select
                                    id="admin"
                                    name="admin"
                                    autoComplete="admin"
                                    value={userInformations.admin}
                                    onChange={(e) =>
                                        setUserInformations({
                                            ...userInformations,
                                            admin: e.target.value,
                                        })
                                    }
                                    className="block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="false">User</option>
                                    <option value="true">Admin</option>
                                </select>
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
