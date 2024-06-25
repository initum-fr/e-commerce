import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Modal from '../../components/Modal'
import { useState } from 'react'

export default function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState({})
    const signIn = useSignIn()
    const navigate = useNavigate()
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        criteriaMode: 'all',
    })
    const onLogin = (data) => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/login`, data)
            .then((response) => {
                if (response.status === 200) {
                    if (
                        signIn({
                            auth: {
                                token: response.data.token,
                                type: 'Bearer',
                            },
                            userState: {
                                user: {
                                    id: response.data.userId,
                                    email: response.data.email,
                                    firstname: response.data.firstname,
                                    lastname: response.data.lastname,
                                    role: response.data.role,
                                    username:
                                        response.data.firstname +
                                        ' ' +
                                        response.data.lastname,
                                },
                            },
                        })
                    ) {
                        if (response.data.role == 'admin') {
                            navigate('/admin', { replace: true })
                        } else {
                            navigate('/profile', { replace: true })
                        }
                    } else {
                        setError({
                            title: 'Wrong username or password',
                            message:
                                'Please enter a valid username and password.',
                            type: 'error',
                        })
                        setIsModalOpen(true)
                    }
                }
            })
            .catch(() => {
                setError({
                    title: 'Wrong username or password',
                    message: 'Please enter a valid username and password.',
                    type: 'error',
                })
                setIsModalOpen(true)
            })
    }
    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} {...error} />
            <div className="flex min-h-full flex-1 flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onLogin)}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('email', {
                                        required:
                                            'Please enter your email address',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                                            message:
                                                'Please enter a valid email address',
                                        },
                                    })}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ messages }) => {
                                    console.log('messages', messages)
                                    return messages
                                        ? Object.entries(messages).map(
                                              ([type, message]) => (
                                                  <p
                                                      key={type}
                                                      className="mt-2 flex text-sm font-medium leading-6 text-red-700"
                                                  >
                                                      <ExclamationTriangleIcon className="mr-2 size-6" />
                                                      {message}
                                                  </p>
                                              )
                                          )
                                        : null
                                }}
                            />
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
                                        href="#"
                                        className="font-semibold text-gray-600 hover:text-gray-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Please enter your password',
                                    })}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ messages }) => {
                                        console.log('messages', messages)
                                        return messages
                                            ? Object.entries(messages).map(
                                                  ([type, message]) => (
                                                      <p
                                                          key={type}
                                                          className="mt-2 flex text-sm font-medium leading-6 text-red-700"
                                                      >
                                                          <ExclamationTriangleIcon className="mr-2 size-6" />
                                                          {message}
                                                      </p>
                                                  )
                                              )
                                            : null
                                    }}
                                />
                            </div>
                        </div>
                        <div id="alert-container"></div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link
                            to="/register"
                            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
                        >
                            Sign up !
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
