import { Route, Navigate, BrowserRouter, Routes } from 'react-router-dom'
// import AuthProvider from 'react-auth-kit'
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
import Payment from './pages/Payment'
import AdminCategory from './pages/AdminCategory'
import { BagContext } from './utils/context'
import { loadStripe } from '@stripe/stripe-js'
import Complete from './pages/Complete'
import { useContext } from 'react'

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`)

export default function App() {
    const { isBagEmpty } = useContext(BagContext)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route path="*" element={<Error />} />
                    <Route index element={<Navigate to="shop/products" />} />
                    <Route path="shop">
                        <Route index element={<Home />} />
                        <Route path="products">
                            <Route index element={<Products />} />
                        </Route>
                    </Route>
                    <Route
                        path="checkout"
                        element={
                            isBagEmpty() ? (
                                <Navigate to="/shop/products" />
                            ) : (
                                <Payment stripePromise={stripePromise} />
                            )
                        }
                    />
                    <Route
                        path="complete"
                        element={<Complete stripePromise={stripePromise} />}
                    />
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
                                    <Route
                                        path=":userId"
                                        element={<AdminUser />}
                                    />
                                    <Route
                                        path="create"
                                        element={<CreateNewUser />}
                                    />
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
                                    <Route
                                        index
                                        element={<AdminCategories />}
                                    />
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
            </Routes>
        </BrowserRouter>
    )
}
