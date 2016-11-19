export default {
  state: {
    message: 'Hello!',
    isConnected: false,
    user: null,
    cart: {
      content: []
    }
  },
  setMessageAction (newValue) {
    this.state.message = newValue
  },
  clearMessageAction () {
    this.state.message = 'action B triggered'
  },
  setUserAction(x) {
    this.state.user = x
  },
  cartAddProduct(product, quantity) {
    this.state.cart.content.push({product, quantity})
  },
  cartRemoveProduct(index) {
    this.state.cart.content.splice(index, 1)
  }
}
