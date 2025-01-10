// import React from 'react'
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
import Checkout from './pages/Checkout'
import AdminCategory from './pages/AdminCategory'
import { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
    'pk_test_51Qfk94BX9xYglzvtnrZEfKG2RzuejFvhfLSdyyb6thQeWRaUSszcB0EcyNRLt0vdGTfCTTXVc21VvKFLYrgfxFlt00J7Pwh5QR'
)

export default function App() {
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: [{ id: 'xl-tshirt', amount: 1000 }],
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [])

    const appearance = {
        theme: 'stripe',
    }
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto'

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
                            clientSecret && (
                                <Elements
                                    options={{
                                        clientSecret,
                                        appearance,
                                        loader,
                                    }}
                                    stripe={stripePromise}
                                >
                                    <Checkout />
                                </Elements>
                            )
                        }
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
