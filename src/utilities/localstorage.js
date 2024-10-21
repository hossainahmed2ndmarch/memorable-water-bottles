const getStoredCart = () => {
 const storedCartString = localStorage.getItem('cart')
 if (storedCartString) {
  return JSON.parse(storedCartString)
 }
 return [];
}

// Save to local storage
const saveCartToLocalStorage = (cart) => {
 const cartStringified = JSON.stringify(cart);
 localStorage.setItem('cart', cartStringified);
}

// Add to local storage
const addCartToLocalStorage = (id) => {
 const cart = getStoredCart();
 cart.push(id);
 // Save
 saveCartToLocalStorage(cart);
}


// Remove
const removeFromLocalStorage = (id) => {
 const cart = getStoredCart();
 const remaining = cart.filter(idx => idx !== id);
 saveCartToLocalStorage(remaining);
}

export { addCartToLocalStorage, getStoredCart, removeFromLocalStorage }