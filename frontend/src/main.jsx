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

// pages import
import Home from './pages/Home';
import Shop from './pages/Shop';
import Root from './routes/root';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

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
      <Route path="profile" element={<Profile />} />
      <Route path="logout" element={<Logout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
