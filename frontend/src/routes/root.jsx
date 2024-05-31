import { Link, Outlet } from 'react-router-dom'
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Bag from '../components/Bag'
import { useState } from 'react'

const navigation = [
    {
        name: 'Men',
        link: 'shop/men',
    },
    {
        name: 'Women',
        link: 'shop/women',
    },
    {
        name: 'Equipment',
        link: 'shop/equipment',
    },
]

export default function Root() {
    // const [inBag, setInBag] = useState([
    //     {
    //         id: 1,
    //         name: 'Glove',
    //         price: 20,
    //         quantity: 1,
    //     },
    //     {
    //         id: 2,
    //         name: 'Shoe',
    //         price: 50,
    //         quantity: 1,
    //     },
    //     {
    //         id: 3,
    //         name: 'Hat',
    //         price: 10,
    //         quantity: 1,
    //     },
    // ])
    // const [open, setOpen] = useState(false)
    const title = 'GLOVER'
    return (
        <>
            <header className="mx-auto bg-black">
                <nav className="mx-10 grid h-16 grid-cols-3 items-center justify-between text-white">
                    <div className="flex gap-x-14 justify-self-start">
                        {navigation.map((nav) => {
                            return (
                                <Link
                                    to={nav.link}
                                    key={nav.name}
                                    className="uppercase hover:underline"
                                >
                                    {nav.name}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="justify-self-center text-2xl">
                        <Link className="font-bold">{title}</Link>
                    </div>
                    <div className="flex gap-2 justify-self-end">
                        <Link to="/profile">
                            <UserCircleIcon className="size-6" />
                        </Link>
                        <button onClick={() => setOpen(true)} className="flex">
                            <ShoppingBagIcon className="size-6" />
                            (0)
                        </button>
                    </div>
                </nav>
                {/* <Bag open={open} setOpen={setOpen} inBag={inBag} /> */}
            </header>
            <main className="max-w-8xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </>
    )
}
