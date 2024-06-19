import { Fragment, useContext, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'

import { BagContext } from '../../utils/context'
import { useNavigate } from 'react-router-dom'

export default function Bag({ setOpen, open }) {
    const { inBag, setInBag } = useContext(BagContext)
    const navigate = useNavigate()

    return (
        <Transition show={open}>
            <Dialog className="relative z-40" onClose={setOpen}>
                <TransitionChild
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                                    <TransitionChild
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </TransitionChild>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                                                My Bag
                                            </DialogTitle>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {inBag.length ? (
                                                <ul className="divide-y divide-gray-200">
                                                    {inBag.map((item) => (
                                                        <li
                                                            key={item._id}
                                                            className="flex py-6"
                                                        >
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                                                                <img
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>
                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-semibold text-gray-900">
                                                                        <h3>
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </h3>
                                                                        <p>
                                                                            {
                                                                                item.price
                                                                            }
                                                                            €
                                                                        </p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">
                                                                        {
                                                                            item.description
                                                                        }
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
                                                                            {
                                                                                item.quantity
                                                                            }
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
                                        <div className="px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-semibold text-gray-900">
                                                <p>Total</p>
                                                <p>
                                                    {inBag
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                item.price *
                                                                    item.quantity,
                                                            0
                                                        )
                                                        .toFixed(2)}{' '}
                                                    €
                                                </p>
                                            </div>
                                            <div className="mt-6 grid gap-y-2">
                                                <button
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    type="button"
                                                    className="w-full rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                >
                                                    Continue shopping
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigate('/checkout')
                                                        setOpen(false)
                                                    }}
                                                    disabled={!inBag.length}
                                                    type="button"
                                                    className="w-full rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
