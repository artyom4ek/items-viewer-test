import { createStackNavigator } from 'react-navigation'

import ItemsViewerScreenNavigationFactory from './screens/ItemsViewerScreenNavigationFactory'
import EditItemScreenNavigationFactory from './screens/EditItemScreenNavigationFactory'

// Types imports
import { ItemsViewerScreen } from '../containers/ItemsViewerScreenFactory'
import { EditItemScreen } from '../containers/EditItemScreenFactory'

export default function MainNavigatorFactory(
  ItemsViewerScreen: ItemsViewerScreen,
  EditItemScreen: EditItemScreen
) {
  const MainNavigator = createStackNavigator(
    {
      ItemsViewer: {
        screen: ItemsViewerScreenNavigationFactory(ItemsViewerScreen)
      },
      EditItem: {
        screen: EditItemScreenNavigationFactory(EditItemScreen)
      }
    },
    {
      initialRouteName: 'ItemsViewer',
      mode: 'modal',
      headerMode: 'none'
    }
  )

  return MainNavigator
}
