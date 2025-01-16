import { Elements } from '@stripe/react-stripe-js'
import { useContext, useEffect, useState } from 'react'
import Checkout from '../../components/Checkout'
import { BagContext } from '../../utils/context'

export default function Payment({ stripePromise }) {
    const [clientSecret, setClientSecret] = useState('')
    const { inBag, isBagEmpty } = useContext(BagContext)
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: inBag,
            }),
        })
            .then((res) => res.json())
            .then(({ clientSecret }) => setClientSecret(clientSecret))
        console.log(inBag)
    }, [])
    return (
        <div>
            <h1>Payment</h1>
            {isBagEmpty() && <p>Your bag is empty</p>}
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <Checkout />
                </Elements>
            )}
        </div>
    )
}
