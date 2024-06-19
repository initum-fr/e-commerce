import axios from 'axios'
import Input from '../../components/Input'
import Label from '../../components/Label'
import { Link, useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import GoBack from '../../components/GoBack'

export default function CreateNewUser() {
    const authHeader = useAuthHeader()
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const userData = Object.fromEntries(formData)
        console.log(userData, authHeader)
        axios
            .post(`${import.meta.env.VITE_API_URL}/users`, userData, {
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
            <h2 className="mb-4 text-2xl font-bold">Create a new user</h2>
            <p className="text-gray-500">You can create a new user here.</p>
            <form className="w-full" onSubmit={(e) => onSubmit(e)}>
                <div className="space-y-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <Label htmlFor="firstname" label="First name" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <Label htmlFor="lastname" label="Last name" />
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Doe"
                                    required
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
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="password" label="Password" />
                            <div className="mt-2">
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="**********"
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <Label htmlFor="admin" label="Role" />
                            <div className="mt-2">
                                <select name="admin" id="admin" required>
                                    <option value="true">Admin</option>
                                    <option value="false" selected>
                                        User
                                    </option>
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
