import compose from './utils/compose'


export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, initState) => {
    const store = createStore(reducer, initState)
    
    let dispatch = () => {
      console.error('默认dispatch函数')
    }
    const chain = middlewares.map(middleware => middleware({
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }))
    dispatch = compose(...chain)(store.dispatch)
    
    return {
      ...store,
      dispatch,
    }
  }
}