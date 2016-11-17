export default {
  state: {
    message: 'Hello!',
    isConnected: false,
    user: null
  },
  setMessageAction (newValue) {
    this.state.message = newValue
  },
  clearMessageAction () {
    this.state.message = 'action B triggered'
  },
  setUserAction(x) {
    this.state.user = x
  }
}
