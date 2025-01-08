class MyEventEmitter {
  listeners = {}

  on(event, listener) {
    if (listeners[event]) {
      this.listeners[event].push(listener)
    } else {
      this.listeners[event] = [listener]
    }
  }

  emit(event, data) {
    const eventListeners = this.listeners[event]

    if (eventListeners?.length) {
      for (let i = 0; i < eventListeners.length; i++) {
        eventListeners[i](data)
      }
    }
  }
}