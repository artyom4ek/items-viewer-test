import StoreManager from './StoreManager'
import { createStore, applyMiddleware, Store, Middleware, Reducer } from 'redux'
import { persistStore, Persistor } from 'redux-persist'

export default class PersistedStoreManager extends StoreManager {
  persistor?: Persistor
  private _onRehydrateFinishCallbacks: Array<() => void> = []

  onRehydrateFinish(callback: () => void) {
    this._onRehydrateFinishCallbacks.push(callback)
  }

  protected createStore(reducer: Reducer, middleware: Array<Middleware>): Store {
    const store = createStore(reducer, {}, applyMiddleware(...middleware))
    this.persistor = persistStore(store, undefined, () => {
      this._onRehydrateFinishCallbacks.forEach(callback => callback())
    })
    return store
  }
}
