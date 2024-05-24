import { useParams, useNavigate, Link } from "react-router-dom"
import Label from "../../components/Label"
import Input from "../../components/Input"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"
import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminUser() {
    const [userInformations, setUserInformations] = useState({})
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const { userId } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8000/users/${userId}`, { headers: { Authorization: authHeader } })
            .then((response) => {
                console.log(response.data)
                setUserInformations(response.data)
            })
            .catch(() => {
                alert('/admin')
            })
    }, [])
    const onSubmitNewInfos = (e) => {
        e.preventDefault();
        console.log("onSubmitNewInfos", userInformations)
        axios.put(`http://localhost:8000/users/${userId}`, userInformations, { headers: { Authorization: authHeader } })
            .then(() => {
                navigate('../')
            })
            .catch((err) => {
                alert(err)
            })
    }
    return (
        <div className="bg-white py-12 mx-10">
            <h1 className="text-2xl font-bold mb-4">Edit an user</h1>
            <p className="text-gray-500">You can modify user information</p>
            <form className="w-full" onSubmit={e => onSubmitNewInfos(e)}>
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
                                    onChange={(e) => setUserInformations({ ...userInformations, firstname: e.target.value })}
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
                                    onChange={(e) => setUserInformations({ ...userInformations, lastname: e.target.value })}
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
                                    onChange={(e) => setUserInformations({ ...userInformations, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="password" label="New Password (optional)" />
                            <div className="mt-2">
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="********"
                                    value={userInformations.password}
                                    onChange={(e) => setUserInformations({ ...userInformations, password: e.target.value })}
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
        </div>
    )
}