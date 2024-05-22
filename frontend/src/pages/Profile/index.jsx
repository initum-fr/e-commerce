import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Label from "../../components/Label"

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
                                        <input
                                            value={userInformations.firstname}
                                            onChange={(e) => setUserInformations({ ...userInformations, firstname: e.target.value })}
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <Label htmlFor="last-name" label="Last name" />
                                    <div className="mt-2">
                                        <input
                                            value={userInformations.lastname}
                                            onChange={(e) => setUserInformations({ ...userInformations, lastname: e.target.value })}
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <Label htmlFor="email" label="Email address" />
                                    <div className="mt-2">
                                        <input
                                            value={userInformations.email}
                                            onChange={(e) => setUserInformations({ ...userInformations, email: e.target.value })}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <Label htmlFor="password" label="New Password (optional)" />
                                    <div className="mt-2">
                                        <input
                                            value={userInformations.password}
                                            onChange={(e) => setUserInformations({ ...userInformations, password: e.target.value })}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
