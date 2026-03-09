import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addToCart } from './features/cart/cartSlice'
import CartPanel from './components/CartPanel'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://dummyjson.com/products')
        setProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }))
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Store</h1>
        <div className="cart-count">
          Cart: {getTotalQuantity()} item(s) ({cartItems.length} unique)
        </div>
      </header>

      <div className="app-container">
        <div className="products-section">
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button
                  className={`add-to-cart-btn ${isProductInCart(product.id) ? 'added' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={isProductInCart(product.id)}
                >
                  {isProductInCart(product.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="cart-section">
          <CartPanel />
        </aside>
      </div>
    </div>
  )
}

export default App
