import { Link, Outlet } from 'react-router-dom'
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function Root() {
    const title = 'GLOVER'
    return (
        <>
            <header className="mx-auto bg-black">
                <nav className="grid grid-cols-3 items-center h-16 mx-5 text-white">
                    <div className="justify-self-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
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
