import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Modal from '../../components/Modal'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Register() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        criteriaMode: 'all',
    })

    const onRegister = (data) => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/register`, data)
            .then((response) => {
                if (response.status == 201) {
                    navigate('/login', { replace: true })
                }
            })
            .catch((err) => {
                setError({
                    type: 'error',
                    title: 'Unable to register!',
                    message: 'User already exists',
                })
                setIsModalOpen(true)
            })
    }
    const genPassword = (e) => {
        e.preventDefault()
        const generatedPassword = `${Math.random().toString(36).slice(-8)}-${Math.random().toString(36).slice(-8)}-${Math.random().toString(36).slice(-8)}`
        document.getElementById('password').type = 'text'
        document.getElementById('repassword').type = 'text'
        setValue('password', generatedPassword, { shouldValidate: true })
        setValue('repassword', generatedPassword, { shouldValidate: true })
    }
    return (
        <>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} {...error} />
            <div className="flex min-h-full flex-1 flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onRegister)}
                    >
                        <div className="flex flex-row gap-4">
                            <div>
                                <label
                                    htmlFor="firstname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="firstname"
                                        {...register('firstname', {
                                            required: 'First name is required',
                                        })}
                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="firstname"
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
                            <div>
                                <label
                                    htmlFor="lastname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="lastname"
                                        {...register('lastname', {
                                            required: 'Last name is required',
                                        })}
                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="lastname"
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
                                    name="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
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
                                        onClick={(e) => genPassword(e)}
                                        className="group flex gap-x-2 font-semibold text-gray-600 hover:text-gray-500"
                                    >
                                        Generate{' '}
                                        <ArrowPathIcon className="size-5 group-hover:animate-spin" />
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Password must be at least 8 characters',
                                        },
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
                                    name="repassword"
                                    id="repassword"
                                    type="password"
                                    {...register('repassword', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Password must be at least 8 characters',
                                        },
                                    })}
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="repassword"
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
                        <div>
                            <p
                                id="alert-span"
                                className="text-center text-xs font-bold text-red-500"
                            ></p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already member?{' '}
                        <Link
                            to="/login"
                            className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
                        >
                            Sign in !
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
