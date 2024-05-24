import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

// pages import
import Home from './pages/Home';
import Shop from './pages/Shop';
import Root from './routes/root';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';
import AdminUsers from './pages/AdminUsers';
import AdminUser from './pages/AdminUser';
// import PrivateRoute from './components/PrivateRoute';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route
      path="/"
      element={<Root />}
    >
      <Route path="*" element={<Error />} />
      <Route index element={<Navigate to='home' />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* Only for logged users */}
      <Route element={<AuthOutlet fallbackPath='/login' />}>
        <Route path="profile" element={<Profile />} />
        {/* Only for admin users */}
        <Route element={<AdminRoute />}>
          <Route path="admin" >
            <Route index element={<Admin />} />
            <Route path="users">
              <Route index element={<AdminUsers />} />
              <Route path=":userId" element={<AdminUser />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="logout" element={<Logout />} />
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
