import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Label from "../../components/Label"
import Input from "../../components/Input"

export default function Profile() {
    const [userInformations, setUserInformations] = useState({})
    const navigate = useNavigate()
    const onSubmitNewInfos = (e) => {
        e.preventDefault();
        console.log("onSubmitNewInfos", userInformations)
        axios.put(`http://localhost:8000/users/${localStorage.getItem('userId')}`, userInformations, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                alert(err)
            })
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response.data)
                setUserInformations(response.data)
            })
            .catch(() => {
                navigate('/logout')
            })
    }, [])
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form className="w-full" onSubmit={e => onSubmitNewInfos(e)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                You can change your profile information here.
                            </p>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
