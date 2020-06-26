import React from 'react'
import { Provider } from 'react-redux'

// Types imports
import StoreManager from '_app/utils/StoreManager'
import { IRootComponentProvider } from '..'

export default function(storeManager: StoreManager, rootComponentProvider: IRootComponentProvider) {
  const { RootComponent } = rootComponentProvider

  class RootContainer extends React.Component<{}> {
    render() {
      return (
        <Provider store={storeManager.store!}>
          <>
            <RootComponent />
          </>
        </Provider>
      )
    }
  }

  return RootContainer
}
