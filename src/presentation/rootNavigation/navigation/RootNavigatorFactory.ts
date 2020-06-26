import { createSwitchNavigator } from 'react-navigation'

// Types imports
import { INavigatorProvidingModule } from '..'

export default function RootNavigatorFactory (mainFlow: INavigatorProvidingModule) {
  const RootNavigator = createSwitchNavigator({
    MainNav: {
      screen: mainFlow.Navigator
    }
  })

  return RootNavigator
}
