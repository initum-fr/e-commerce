import { Link, Outlet } from 'react-router-dom'
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const navigation = [
    {
        name: 'Men',
        link: 'shop/men'
    },
    {
        name: 'Women',
        link: 'shop/women'
    },
    {
        name: 'Equipment',
        link: 'shop/equipment'
    }
]

export default function Root() {
    const title = 'GLOVER'
    return (
        <>
            <header className="mx-auto bg-black">
                <nav className="grid grid-cols-3 items-center justify-between h-16 mx-10 text-white">
                    <div className="justify-self-start gap-x-14 flex">
                        {navigation.map((nav)=>{
                            return (
                                <Link to={nav.link} key={nav.name} className="uppercase hover:underline">{nav.name}</Link>
                            )
                        })}
                    </div>

                    <div className="justify-self-center text-2xl">
                        <Link className="font-bold">{title}</Link>
                    </div>
                    <div className="justify-self-end flex gap-2">
                        <Link to="/profile">
                            <UserCircleIcon className="size-6" />
                        </Link>
                        <Link to="/bag" className='flex'>
                            <ShoppingBagIcon className="size-6" />
                            (0)
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-20">
                <Outlet />
            </main>
        </>
    )
}
