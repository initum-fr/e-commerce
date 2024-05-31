import { Outlet, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
const GoBack = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate('../')
    }

    return (
        <div className="mb-7 flex items-center">
            <button
                className="flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                onClick={goBack}
            >
                <ChevronLeftIcon className="mr-2 h-6 w-6" />
                Go Back
            </button>
            <Outlet />
        </div>
    )
}

export default GoBack
