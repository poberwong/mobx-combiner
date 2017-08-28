import { isObservable } from "mobx"
/**
 * Turns an object whose values are mobx store classes, into an object with the
 * same keys, but with every class generated into an instance so they can be used as
 * the store object.
 *. This is just a convenience method, as you can still call
 * `new YourClass()` yourself just fine.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 * @returns {Object} The object mimicking the original object, but with
 * every class generated into an instance.
 * 1. If you pass a single function which could be a class in es6 or constructor in es5,
 * `combineStores` will return an instance directly.
 * 2. If you pass an observable object, It will return itself without any process
 */
export default function combineStores (preStores) {
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `combineStores expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. `
    )
  }

  if (typeof actionCreators === 'function') {
    return new preStores()
  }

  if (isObservable(preStores)) {
    return preStores
  }

  const keys = Object.keys(preStores)
  const stores = {}
  keys.forEach(key => {
    if (typeof preStores[key] === "function") {
      stores[key] = new preStores[key]()
    } else {
      stores[key] = preStores[key]
    }
  })
  return stores
}
