import { useSelector, useDispatch } from 'react-redux'
import { updateQuantity, removeFromCart } from '../features/cart/cartSlice'
import '../styles/CartPanel.css'

function CartPanel() {
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const handleIncreaseQuantity = (id, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }))
  }

  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }))
    }
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-panel">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">Your cart is empty</div>
      </div>
    )
  }

  const total = calculateTotal()

  return (
    <div className="cart-panel">
      <h2>Shopping Cart ({cartItems.length})</h2>
      
      <div className="cart-items-container">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            
            <div className="item-details">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-price">
                Unit Price: <span>${item.price.toFixed(2)}</span>
              </p>
            </div>

            <div className="item-quantity">
              <button
                className="qty-btn"
                onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
              >
                +
              </button>
            </div>

            <div className="item-subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: <span>${total.toFixed(2)}</span></h3>
      </div>

      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  )
}

export default CartPanel
