import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const navigate = useNavigate()
    const onRegister = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userData = Object.fromEntries(formData)
        axios
            .post('http://localhost:8000/auth/register', userData)
            .then((response) => {
                if (response.status == 201) {
                    navigate('/login', { replace: true })
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 400:
                        document.getElementById('alert-span').innerHTML =
                            `<p class="text-center text-red-500 text-xs font-bold">All fields are required!</p>`
                        break
                    case 409:
                        document.getElementById('alert-span').innerHTML =
                            `<p class="text-center text-red-500 text-xs font-bold">User already exists!</p>`
                        break
                    default:
                        document.getElementById('alert-span').innerHTML =
                            `<p class="text-center text-red-500 text-xs font-bold">An error occurred. Please try again later.</p>`
                        break
                }
            })
    }
    const genPassword = (event) => {
        event.preventDefault()
        const generatedPassword = `${Math.random().toString(36).slice(-8)}-${Math.random().toString(36).slice(-8)}-${Math.random().toString(36).slice(-8)}`
        document.getElementById('password').type = 'text'
        document.getElementById('repassword').type = 'text'
        setPassword(generatedPassword)
        setRepassword(generatedPassword)
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={(e) => onRegister(e)}
                    >
                        <div className="flex flex-row gap-4">
                            <div>
                                <label
                                    htmlFor="fistname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        autoComplete="firstname"
                                        required
                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="lastname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        autoComplete="lastname"
                                        required
                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href=""
                                        onClick={(e) => genPassword(e)}
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Generate a new password
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor="repassword"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Re-enter password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={repassword}
                                    onChange={(e) =>
                                        setRepassword(e.target.value)
                                    }
                                    id="repassword"
                                    name="repassword"
                                    type="password"
                                    autoComplete="repassword"
                                    required
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <p
                                id="alert-span"
                                className="text-center text-xs font-bold text-red-500"
                            ></p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already member?{' '}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in !
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
