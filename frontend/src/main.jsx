import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
    Navigate,
} from 'react-router-dom'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

// pages import
import Home from './pages/Home'
import Products from './pages/Products'
import Root from './routes/root_v2'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Logout from './pages/Logout'
import Admin from './pages/Admin'
import AdminRoute from './components/AdminRoute'
import AdminUsers from './pages/AdminUsers'
import AdminUser from './pages/AdminUser'
import CreateNewUser from './pages/CreateNewUser'
import AdminProducts from './pages/AdminProducts'
import CreateNewProduct from './pages/CreateNewProduct'
import AdminProduct from './pages/AdminProduct'
import AdminCategories from './pages/AdminCategories'
import CreateNewCategory from './pages/CreateNewCategory'
import AdminCategory from './pages/AdminCategory'
// import PrivateRoute from './components/PrivateRoute';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
})

import { createContext } from 'react'
import { BagProvider } from './utils/context'
import Checkout from './pages/Checkout'

const BagContext = createContext([])

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route path="*" element={<Error />} />
            <Route index element={<Navigate to="shop" />} />
            <Route path="shop">
                <Route index element={<Home />} />
                <Route path="products">
                    <Route index element={<Products />} />
                </Route>
            </Route>
            <Route path="checkout">
                <Route index element={<Checkout />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* Only for logged users */}
            <Route element={<AuthOutlet fallbackPath="/login" />}>
                <Route path="profile" element={<Profile />} />
                {/* Only for admin users */}
                <Route element={<AdminRoute />}>
                    <Route path="admin">
                        <Route index element={<Admin />} />
                        <Route path="users">
                            <Route index element={<AdminUsers />} />
                            <Route path=":userId" element={<AdminUser />} />
                            <Route path="create" element={<CreateNewUser />} />
                        </Route>
                        <Route path="products">
                            <Route index element={<AdminProducts />} />
                            <Route
                                path=":productId"
                                element={<AdminProduct />}
                            />
                            <Route
                                path="create"
                                element={<CreateNewProduct />}
                            />
                        </Route>
                        <Route path="categories">
                            <Route index element={<AdminCategories />} />
                            <Route
                                path=":categoryId"
                                element={<AdminCategory />}
                            />
                            <Route
                                path="create"
                                element={<CreateNewCategory />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path="logout" element={<Logout />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider store={store}>
            <BagProvider>
                <RouterProvider router={router} />
            </BagProvider>
        </AuthProvider>
    </React.StrictMode>
)
