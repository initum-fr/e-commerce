import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
const GoBack = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('../');
    };

    return (
        <div className="flex items-center mb-7">
            <button
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 "
                onClick={goBack}
            >
                <ChevronLeftIcon className="w-6 h-6 mr-2" />
                Go Back
            </button>
            <Outlet />
        </div>
    );
};

export default GoBack;