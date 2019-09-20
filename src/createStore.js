
export default function createStore(reducer, initState, enhancer) {
  let state = initState
  let listeners = []
  
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initState)
  }
  
  function getState() {
    return state
  }
  
  function subscribe(func) {
    listeners.push(func)
    return () => {
      const idx = listeners.indexOf(func)
      listeners.splice(idx, 1)
    }
  }
  
  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(func => {
      func()
    })
  }
  
  return {
    getState,
    dispatch,
    subscribe,
  }
}
