import { Field, Label, Switch } from '@headlessui/react'
import { useContext, useState } from 'react'
import { BagContext } from '../../utils/context'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Checkout() {
    const { inBag, setInBag } = useContext(BagContext)
    const [agreed, setAgreed] = useState(false)
    return (
        <>
            <div className="grid w-full items-stretch gap-x-12 gap-y-10 rounded-lg border bg-gray-50 p-5 sm:p-10 lg:grid-cols-2 lg:gap-y-0">
                <div className="divide-y">
                    <p className="mb-10">
                        <h4 className="text-xl">Contact information</h4>
                        <div className="my-4 w-full">
                            <label
                                htmlFor="email"
                                className="block text-sm leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </p>
                    <p className="pt-10">
                        <h4 className="text-xl">Shipping information</h4>
                        <div className="my-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="company"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Company
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        autoComplete="organization"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Adress
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="text"
                                        id="text"
                                        autoComplete="texts"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Appartment, suite, etc.
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    City
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </p>
                </div>
                <div className="grid">
                    <div>
                        <h4 className="text-xl">Payment information</h4>

                        <button className="mt-11 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-apple"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                            </svg>
                            Pay
                        </button>
                        <div className="mt-4 rounded-lg border bg-white p-6">
                            <div className="relative flex-1">
                                <div className="">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Credit card
                                        </h3>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-credit-card"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                        </svg>
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
                                </div>
                            </div>
                        </div>
                    </div>
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
                </div>
            </div>
        </>
    )
}
