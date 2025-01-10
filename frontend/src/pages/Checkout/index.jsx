import { useContext, useEffect, useState } from 'react'
import { BagContext } from '../../utils/context'
import { useForm } from 'react-hook-form'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Field, Fieldset, Label, Legend } from '@headlessui/react'
import Modal from '../../components/Modal'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// icons
import VisaIcon from '../../utils/assets/icons/visa-logo.svg'
import MasterCardIcon from '../../utils/assets/icons/mastercard-logo.svg'
import GoogleIcon from '../../utils/assets/icons/google-logo.svg'
import AppleIcon from '../../utils/assets/icons/apple-logo.svg'

// components
import FormErrorMessage from '../../components/FormErrorMessage'

import axios from 'axios'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Checkout() {
    // stripe
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const paymentElementOptions = {
        layout: 'accordion',
    }

    const isAuth = useIsAuthenticated()
    const auth = useAuthUser()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({})
    useEffect(() => {
        document.title = 'Checkout'
        if (isAuth) {
            setValue('email', auth.user.email)
            setValue('firstname', auth.user.firstname)
            setValue('lastname', auth.user.lastname)
        }
    }, [])
    const { inBag, setInBag } = useContext(BagContext)
    const [addresses, setAddresses] = useState([])

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useForm({
        criteriaMode: 'all',
    })

    const onSubmit = async (data) => {
        if (inBag.length <= 0) {
            setModalInfo({
                type: 'error',
                title: 'Error',
                message: 'Your bag is empty',
            })
            setIsModalOpen(true)
        } else {
            console.log(data)
        }
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: 'http://localhost:3000/complete',
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An unexpected error occurred.')
        }

        setIsLoading(false)
    }

    const onAddressChange = (e) => {
        const address = e.target.value.split(' ').join('+')
        axios
            .get('https://api-adresse.data.gouv.fr/search/?q=' + address)
            .then((response) => {
                console.log(response.data.features)
                setAddresses(response.data.features)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleValidateAddress = (address) => {
        setValue('address', address.properties.label, { shouldValidate: true })
        setValue('house_number', address.properties.housenumber, {
            shouldValidate: true,
        })
        setValue('house_street', address.properties.street, {
            shouldValidate: true,
        })
        setValue('city', address.properties.city, { shouldValidate: true })
        setValue('zip', address.properties.postcode, { shouldValidate: true })
        setAddresses([])
    }
    return (
        <>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                {...modalInfo}
            />
            <form
                className="grid w-full items-stretch gap-x-12 gap-y-10 rounded-lg border bg-gray-50 p-5 sm:p-10 lg:grid-cols-2 lg:gap-y-0"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="order-last grid gap-y-10 lg:order-first">
                    <div>
                        <h4 className="text-xl">Order summary</h4>
                        <div className="mt-4 rounded-lg border bg-white p-6">
                            <div className="relative flex-1">
                                {inBag.length ? (
                                    <ul className="divide-y divide-gray-200">
                                        {inBag.map((item) => (
                                            <li
                                                key={item._id}
                                                className="flex py-6"
                                            >
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-semibold text-gray-900">
                                                            <h3>{item.name}</h3>
                                                            <p>{item.price}€</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 flex justify-between">
                                                        <div className="flex items-center">
                                                            <button className="text-gray-500">
                                                                <span className="sr-only">
                                                                    Remove
                                                                </span>
                                                                <XMarkIcon
                                                                    onClick={() => {
                                                                        setInBag(
                                                                            inBag.filter(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i._id !==
                                                                                    item._id
                                                                            )
                                                                        )
                                                                    }}
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button className="text-gray-500">
                                                                <span className="sr-only">
                                                                    Increase
                                                                    quantity
                                                                </span>
                                                                <PlusIcon
                                                                    onClick={() => {
                                                                        setInBag(
                                                                            inBag.map(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i._id ===
                                                                                    item._id
                                                                                        ? {
                                                                                              ...i,
                                                                                              quantity:
                                                                                                  i.quantity +
                                                                                                  1,
                                                                                          }
                                                                                        : i
                                                                            )
                                                                        )
                                                                    }}
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                            <span className="mx-2 text-sm font-semibold text-gray-900">
                                                                {item.quantity}
                                                            </span>
                                                            <button className="text-gray-500">
                                                                <span className="sr-only">
                                                                    Decrease
                                                                    quantity
                                                                </span>
                                                                <MinusIcon
                                                                    onClick={() => {
                                                                        item.quantity !=
                                                                            1 &&
                                                                            setInBag(
                                                                                inBag.map(
                                                                                    (
                                                                                        i
                                                                                    ) =>
                                                                                        i._id ===
                                                                                        item._id
                                                                                            ? {
                                                                                                  ...i,
                                                                                                  quantity:
                                                                                                      i.quantity -
                                                                                                      1,
                                                                                              }
                                                                                            : i
                                                                                )
                                                                            )
                                                                    }}
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex h-full items-center">
                                        <div className="w-full">
                                            <p className="text-center text-gray-500">
                                                Your bag is empty
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Subtotal
                                </span>
                                <span className="text-sm text-gray-900">
                                    {inBag
                                        .reduce(
                                            (acc, item) =>
                                                acc +
                                                item.price * item.quantity,
                                            0
                                        )
                                        .toFixed(2)}{' '}
                                    €
                                </span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Shipping
                                </span>
                                <span className="text-sm text-gray-900">
                                    5.00€
                                </span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Taxes
                                </span>
                                <span className="text-sm text-gray-900">
                                    6.00€
                                </span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Total
                                </span>
                                <span className="text-sm text-gray-900">
                                    {(
                                        inBag.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.price * item.quantity,
                                            0
                                        ) + 11
                                    ).toFixed(2)}{' '}
                                    €
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-3 text-xl">Payment information</h4>
                        <PaymentElement
                            id="payment-element"
                            options={paymentElementOptions}
                        />
                        <button
                            disabled={isLoading || !stripe || !elements}
                            id="submit"
                        >
                            <span id="button-text">
                                {isLoading ? (
                                    <div className="spinner" id="spinner"></div>
                                ) : (
                                    'Pay now'
                                )}
                            </span>
                        </button>
                        {/* Show any error or success messages */}
                        {message && <div id="payment-message">{message}</div>}
                        {/* <div className="mt-11 grid gap-x-0 gap-y-6 md:flex md:gap-x-5">
                            <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                <img
                                    src={AppleIcon}
                                    alt="Google Pay"
                                    className="ml-2 mr-1 w-4"
                                />
                                Pay
                            </button>
                            <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                Buy with
                                <img
                                    src={GoogleIcon}
                                    alt="Google Pay"
                                    className="ml-1 w-4"
                                />
                                Pay
                            </button>
                        </div>

                        <div className="py-10 text-center">
                            <p>OR</p>
                        </div>
                        <div className="mt-4 rounded-lg border bg-white p-6">
                            <div className="relative flex-1">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Credit card
                                        </h3>
                                        <div className="flex">
                                            <img
                                                src={MasterCardIcon}
                                                alt="Visa"
                                                className="h-8 w-8"
                                            />
                                            <img
                                                src={VisaIcon}
                                                alt="Visa"
                                                className="h-8 w-8"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label
                                            htmlFor="card-number"
                                            className="block text-sm font-semibold text-gray-900"
                                        >
                                            Card number
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="card-number"
                                                id="card-number"
                                                autoComplete="cc-number"
                                                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="card-expiration-date"
                                                className="block text-sm font-semibold text-gray-900"
                                            >
                                                Expiration date
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="card-expiration-date"
                                                    id="card-expiration-date"
                                                    autoComplete="cc-exp"
                                                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="card-cvc"
                                                className="block text-sm font-semibold text-gray-900"
                                            >
                                                CVC
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="card-cvc"
                                                    id="card-cvc"
                                                    autoComplete="cc-csc"
                                                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-6 w-full rounded-md border bg-gray-50 py-2 text-black">
                                        Pay
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="space-y-10">
                    <Fieldset className="space-y-8">
                        <Legend className="text-xl">Contact information</Legend>
                        <Field className="my-4 w-full">
                            <Label
                                htmlFor="email"
                                className="block text-sm leading-6 text-gray-900"
                            >
                                Email address
                            </Label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    {...register('email', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FormErrorMessage
                                    name="email"
                                    errors={errors}
                                />
                            </div>
                        </Field>
                    </Fieldset>
                    <Fieldset>
                        <Label className="text-xl">Shipping information</Label>
                        <Fieldset className="my-4 grid place-items-stretch gap-x-8 gap-y-6 sm:grid-cols-2">
                            <Field className="col-span-2 sm:col-span-1">
                                <Label
                                    htmlFor="firstname"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    First name
                                </Label>
                                <div className="mt-1">
                                    <input
                                        name="firstname"
                                        {...register('firstname', {
                                            required: 'This field is required',
                                        })}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <FormErrorMessage
                                        name="firstname"
                                        errors={errors}
                                    />
                                </div>
                            </Field>
                            <Field className="col-span-2 sm:col-span-1">
                                <Label
                                    htmlFor="last-name"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Last name
                                </Label>
                                <div className="mt-1">
                                    <input
                                        {...register('lastname', {
                                            required: 'This field is required',
                                        })}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <FormErrorMessage
                                        name="lastname"
                                        errors={errors}
                                    />
                                </div>
                            </Field>
                            {/* Implements Google API there */}
                            <Field className="col-span-2">
                                <Label
                                    htmlFor="address"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Full address
                                </Label>
                                <div className="mt-1">
                                    <input
                                        id="address"
                                        {...register('address', {
                                            required: 'This field is required',
                                        })}
                                        onChange={(e) => onAddressChange(e)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <FormErrorMessage
                                        name="address"
                                        errors={errors}
                                    />
                                    <div className="mt-2">
                                        <ul
                                            className={classNames(
                                                'absolute rounded-md border border-gray-200 bg-white shadow-lg'
                                            )}
                                        >
                                            {addresses.map((address) => (
                                                <li
                                                    key={address.properties.id}
                                                    className="cursor-pointer px-3.5 py-2 hover:bg-gray-100"
                                                    onClick={() => {
                                                        handleValidateAddress(
                                                            address
                                                        )
                                                    }}
                                                >
                                                    {address.properties.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Field>

                            <Field className="col-span-2 grid grid-cols-12 gap-x-2">
                                <Field className="col-span-2">
                                    <Label
                                        htmlFor="house_number"
                                        className="block text-sm leading-6 text-gray-900"
                                    >
                                        N°
                                    </Label>
                                    <div className="mt-1">
                                        <input
                                            type="number"
                                            {...register('house_number', {
                                                required:
                                                    'This field is required',
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message:
                                                        'Invalid number format',
                                                },
                                            })}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <FormErrorMessage
                                            name="house_number"
                                            errors={errors}
                                        />
                                    </div>
                                </Field>
                                <Field className="col-span-10">
                                    <Label
                                        htmlFor="house_street"
                                        className="block text-sm leading-6 text-gray-900"
                                    >
                                        Street
                                    </Label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            {...register('house_street', {
                                                required:
                                                    'This field is required',
                                            })}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <FormErrorMessage
                                            name="house_street"
                                            errors={errors}
                                        />
                                    </div>
                                </Field>
                            </Field>
                            <Field className="col-span-2 grid grid-cols-2 gap-x-2">
                                <Field>
                                    <Label
                                        htmlFor="address"
                                        className="block text-sm leading-6 text-gray-900"
                                    >
                                        City
                                    </Label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('city', {
                                                required:
                                                    'This field is required',
                                                pattern: {
                                                    value: /^[a-zA-Z]*$/,
                                                    message:
                                                        'Invalid city format',
                                                },
                                            })}
                                        />
                                    </div>
                                </Field>
                                <Field>
                                    <Label
                                        htmlFor="zip"
                                        className="block text-sm leading-6 text-gray-900"
                                    >
                                        ZIP
                                    </Label>
                                    <div className="mt-1">
                                        <input
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('zip', {
                                                required:
                                                    'This field is required',
                                                pattern: {
                                                    value: /^[0-9]*$/,
                                                    message:
                                                        'Invalid zip format',
                                                },
                                            })}
                                        />
                                    </div>
                                </Field>
                            </Field>
                        </Fieldset>
                    </Fieldset>
                </div>
            </form>
        </>
    )
}
