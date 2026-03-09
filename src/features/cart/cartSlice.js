import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, thumbnail } = action.payload
      
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        // If item exists, increment quantity
        existingItem.quantity += 1
      } else {
        // Add new item with quantity 1
        state.items.push({
          id,
          title,
          price,
          thumbnail,
          quantity: 1
        })
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload
      
      // Remove item from cart by id
      state.items = state.items.filter(item => item.id !== id)
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      
      // Find item and update quantity
      const item = state.items.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
