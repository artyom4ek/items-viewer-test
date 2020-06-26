import MainNavigatorFactory from './navigation/MainNavigatorFactory'

import ItemsViewerScreenFactory from './containers/ItemsViewerScreenFactory'
import EditItemScreenFactory from './containers/EditItemScreenFactory'

// Types imports
import { ItemsViewerModule } from '_app/domain/itemsViewer'

export default function mainFlowModule(itemsViewer: ItemsViewerModule) {
  const ItemsViewerScreen = ItemsViewerScreenFactory(itemsViewer)
  const EditItemScreen = EditItemScreenFactory(itemsViewer)

  const MainNavigator = MainNavigatorFactory(ItemsViewerScreen, EditItemScreen)

  return {
    navigators: {
      MainNavigator
    },
    Navigator: MainNavigator
  }
}

export type MainFlowModule = ReturnType<typeof mainFlowModule>
