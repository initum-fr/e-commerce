import { useContext, useEffect, useState } from 'react'
import { BagContext } from '../../utils/context'
import axios from 'axios'
import { ShippingAddressElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'

const STATUS_CONTENT_MAP = {
    succeeded: {
        text: 'Payment succeeded',
        iconColor: '#30B130',
        // icon: SuccessIcon,
    },
    processing: {
        text: 'Your payment is processing.',
        iconColor: '#6D6E78',
        // icon: InfoIcon,
    },
    requires_payment_method: {
        text: 'Your payment was not successful, please try again.',
        iconColor: '#DF1B41',
        // icon: ErrorIcon,
    },
    default: {
        text: 'Something went wrong, please try again.',
        iconColor: '#DF1B41',
        // icon: ErrorIcon,
    },
}

export default function Complete({ stripePromise }) {
    const { inBag } = useContext(BagContext)
    const [status, setStatus] = useState('default')
    const [intentId, setIntentId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const createOrder = async (paymentIntent) => {
        axios
            .post(`${import.meta.env.VITE_API_URL}/orders`, {
                paymentIntentId: paymentIntent.id,
                orderItems: inBag,
                shippingAddress: {
                    firstname: paymentIntent.shipping.name,
                    lastname: paymentIntent.shipping.name,
                    address: paymentIntent.shipping.address.line1,
                    city: paymentIntent.shipping.address.city,
                    postalCode: paymentIntent.shipping.address.postal_code,
                    country: paymentIntent.shipping.address.country,
                },
                user: {
                    email: 'yassanz.contact@gmail.com',
                },
                isPaid: true,
                paidAt: new Date(),
                paymentMethod: 'Stripe',
                paymentId: paymentIntent.id,
            })
            .then((res) => {
                console.log(res)

                setTimeout(() => {
                    navigate('/')
                }, 5000)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (!stripePromise) {
            return
        }

        stripePromise.then(async (stripe) => {
            const url = new URL(window.location)
            const clientSecret = url.searchParams.get(
                'payment_intent_client_secret'
            )
            // const { error, paymentIntent } =
            //     await stripe.retrievePaymentIntent(clientSecret)
            stripe
                .retrievePaymentIntent(clientSecret)
                .then(({ error, paymentIntent }) => {
                    if (error) {
                        setStatus('default')
                        setIsLoading(false)
                        return
                    } else {
                        createOrder(paymentIntent)
                        setIntentId(paymentIntent.id)
                        setStatus(paymentIntent.status)
                        setIsLoading(false)
                    }
                })
        })
    }, [stripePromise])

    return (
        <>
            <div>
                <h1>Payment Status</h1>

                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <p>
                                {STATUS_CONTENT_MAP[status]?.text ||
                                    STATUS_CONTENT_MAP.default.text}
                            </p>
                            <p>Payment ID: {intentId}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
