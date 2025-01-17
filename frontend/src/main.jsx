import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'
import { BagProvider } from './utils/context'
import App from './App'

// stripe
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@stripe/react-stripe-js'
// const stripePromise = loadStripe(
//     'pk_test_51Qfk94BX9xYglzvtnrZEfKG2RzuejFvhfLSdyyb6thQeWRaUSszcB0EcyNRLt0vdGTfCTTXVc21VvKFLYrgfxFlt00J7Pwh5QR'
// )

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
})

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <AuthProvider store={store}>
        <BagProvider>
            <App />
        </BagProvider>
    </AuthProvider>
    // </React.StrictMode>
)
