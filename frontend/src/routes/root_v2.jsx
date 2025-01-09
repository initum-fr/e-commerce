import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

import { Fragment, useContext, useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Bag from '../components/Bag'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

import { BagContext } from '../utils/context'

export default function Root() {
    const isAuth = useIsAuthenticated()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const auth = useAuthUser()

    useEffect(() => {
        console.log('refresh'), [location]
    })
    const [isBagOpen, setIsBagOpen] = useState(false)
    const { inBag } = useContext(BagContext)

    return (
        <div className="bg-white">
            <Bag open={isBagOpen} setOpen={setIsBagOpen} />

            {/* Mobile menu */}
            <Transition show={open}>
                <Dialog className="relative z-50 lg:hidden" onClose={setOpen}>
                    <TransitionChild
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-40 flex">
                        <TransitionChild
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {/* Links */}

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {isAuth ? (
                                        <div className="flow-root">
                                            <Link
                                                onClick={() => setOpen(false)}
                                                to="/logout"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                Log out
                                            </Link>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flow-root">
                                                <Link
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    to="/login"
                                                    className="-m-2 block p-2 font-medium text-gray-900"
                                                >
                                                    Sign in
                                                </Link>
                                            </div>
                                            <div className="flow-root">
                                                <Link
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    to="/register"
                                                    className="-m-2 block p-2 font-medium text-gray-900"
                                                >
                                                    Create account
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            <header className="bg-white">
                <nav
                    aria-label="Top"
                    className="relative z-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to="/">
                                    <span className="sr-only">
                                        Your Company
                                    </span>
                                    <span>E-COMMERCE</span>
                                </Link>
                            </div>

                            {/* Flyout menus */}

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {isAuth ? (
                                        <>
                                            <span className="text-sm font-medium text-gray-600">
                                                Connected as{' '}
                                                {auth.user.username}
                                            </span>
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
                                            <Link
                                                to="/logout"
                                                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                Log out
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                Sign in
                                            </Link>
                                            <span
                                                className="h-6 w-px bg-gray-200"
                                                aria-hidden="true"
                                            />
                                            <Link
                                                to="/register"
                                                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                Create account
                                            </Link>
                                        </>
                                    )}
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <Link
                                        to="/profile"
                                        className="p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Account</span>
                                        <UserCircleIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <button
                                        className="group -m-2 flex items-center p-2"
                                        onClick={() => setIsBagOpen(true)}
                                    >
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                            {inBag.length}
                                        </span>
                                        <span className="sr-only">
                                            items in cart, view bag
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="max-w-8xl mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    )
}
