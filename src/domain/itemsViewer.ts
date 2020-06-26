import { AsyncStorage } from 'react-native'
import actionCreatorFactory, { isType } from 'typescript-fsa'
import { persistReducer } from 'redux-persist'

import StoreManager from '_app/utils/StoreManager'

// Type imports
import { SagaIterator } from 'redux-saga'
import { Action } from 'redux'

// Interfaces
export interface Item {
  id: number
  name: string
  image?: string
}

interface StateItemsViewer {
  items: Array<Item>
  // TODO: for async in feature
  isLoading: boolean
  error?: Error
}

interface State {
  itemsViewer: StateItemsViewer
}

// Module
export default function itemsViewerModule(storeManager: StoreManager) {
  const actionCreator = actionCreatorFactory('itemsViewer')

  // ---- Actions -----
  // const getItems = actionCreator.async<void, Array<Item>, Error>('GET_ITEMS')

  const addItem = actionCreator<Item>('ADD_ITEM')
  const deleteItem = actionCreator<number>('DELETE_ITEM')

  // Register all sagas
  storeManager.addSaga(function*() {})

  // -----
  const initialState: StateItemsViewer = {
    items: [],
    isLoading: false,
    error: undefined
  }

  // Reducer
  storeManager.addReducer(
    'itemsViewer',
    (state = initialState, action: Action): StateItemsViewer => {
      if (isType(action, addItem)) {
        return {
          ...state,
          items: [...state.items, action.payload],
          isLoading: false
        }
      }

      if (isType(action, deleteItem)) {
        const items = [...state.items]
        const id = action.payload

        return {
          ...state,
          isLoading: false,
          items: items.filter(x => x.id !== id)
        }
      }

      return state
    }
  )

  return {
    actions: {
      // getItems,
      addItem,
      deleteItem
    },
    selectors: {
      items: (state: State) => state.itemsViewer.items,
      isLoading: (state: State) => state.itemsViewer.isLoading,
      error: (state: State) => state.itemsViewer.error
    }
  }
}

export type ItemsViewerModule = ReturnType<typeof itemsViewerModule>
