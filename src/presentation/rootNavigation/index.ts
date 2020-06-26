import {
  NavigationActions,
  NavigationAction,
  NavigationState,
  NavigationContainer
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import RootNavigatorFactory from './navigation/RootNavigatorFactory'

// Type imports
import StoreManager from '_app/utils/StoreManager'

// Interfaces
export interface INavigatorProvidingModule {
  Navigator: NavigationContainer
}

export default function rootNavigationModule (
  storeManager: StoreManager,
  mainFlow: INavigatorProvidingModule
) {
  const RootNavigator = RootNavigatorFactory(mainFlow)

  // Middleware
  const middleware = createReactNavigationReduxMiddleware('root', (state: any) => state.rootNav)
  storeManager.addMiddleware(middleware)

  // Reducer
  const initialState = {
    routeName: 'MainNav',
    state: RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(
      'MainNav'
    ) as NavigationAction)
  }

  storeManager.addReducer('rootNav', (state = initialState, action) => {
    let nextState
    switch (action.type) {
      default:
        if (state) {
          nextState = {
            routeName: state.routeName,
            state: RootNavigator.router.getStateForAction(action, state.state)
          }
        }
        break
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state
  })

  // Container
  const RootNavigatorRedux = reduxifyNavigator(RootNavigator, 'root')
  const mapStateToProps = (state: any) => ({
    state: state.rootNav.state as NavigationState
  })

  return {
    RootComponent: connect(mapStateToProps)(RootNavigatorRedux as any) // HACK: types issue
  }
}

export type RootNavigationModule = ReturnType<typeof rootNavigationModule>
