import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { BagContext } from '../../utils/context'

export default function ProductQuickView({ open, setOpen, product }) {
    const { inBag, setInBag } = useContext(BagContext)
    const addToCart = (product) => {
        const existingProduct = inBag.find((item) => item._id === product._id)
        if (existingProduct) {
            const updatedBag = inBag.map((item) => {
                if (item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                }
                return item
            })
            setInBag(updatedBag)
        } else {
            const newProduct = {
                ...product,
                quantity: 1,
            }
            setInBag([...inBag, newProduct])
        }
        setOpen(false)
    }

    return (
        <Transition show={open}>
            <Dialog className="relative z-40" onClose={setOpen}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <div className="grid w-full grid-cols-1 grid-rows-2 content-end items-start gap-x-6 gap-y-8 sm:grid-cols-2 lg:gap-x-8">
                                        <div className="aspect-h-3 aspect-w-2 row-span-3 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="object-cover object-center"
                                            />
                                        </div>
                                        <div className="col-span-1 row-span-2 grid gap-y-3">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                                {product.name}
                                            </h2>

                                            <h3
                                                id="information-heading"
                                                className="sr-only"
                                            >
                                                Product information
                                            </h3>

                                            <p className="text-md block font-medium text-gray-700">
                                                {product.description}
                                            </p>
                                            <p className="block text-2xl text-gray-900">
                                                {product.price}€
                                            </p>
                                        </div>
                                        <div className="col-span-1 row-span-1">
                                            <button
                                                onClick={() =>
                                                    addToCart(product)
                                                }
                                                className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Add to bag
                                                <ShoppingCartIcon className="ms-2 size-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
