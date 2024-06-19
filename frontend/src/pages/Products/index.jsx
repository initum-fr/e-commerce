import { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductQuickView from '../../components/ProductQuickView'

export default function Products() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [productQuickViewOpen, setProductQuickViewOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`${import.meta.env.VITE_API_URL}/products`)
            .then((response) => {
                setIsLoading(false)
                setProducts(response.data)
            })
            .catch((error) => console.error(error))
    }, [])
    return (
        <>
            <ProductQuickView
                open={productQuickViewOpen}
                setOpen={setProductQuickViewOpen}
                product={selectedProduct}
            />
            <h3 className="text-2xl font-bold">All products</h3>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    products.map((product, index) => (
                        <div
                            key={`${index}-${product.id}`}
                            className="group relative"
                        >
                            <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                <img
                                    src={
                                        product.image
                                            ? product.image
                                            : `https://placehold.it/300x300?text=`
                                    }
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link
                                            onClick={() => {
                                                setSelectedProduct(product)
                                                setProductQuickViewOpen(true)
                                            }}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.description}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {product.price}€
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
