import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import ItemsViewerScreenView from '../views/ItemsViewerScreenView'
import { ItemsViewerModule } from '_app/domain/itemsViewer'

export default function ItemsViewerScreenFactory(itemsViewer: ItemsViewerModule) {
  function mapStateToProps(state: any) {
    return {
      items: itemsViewer.selectors.items(state)
    }
  }

  function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        deleteItem: itemsViewer.actions.deleteItem
      },
      dispatch
    )
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemsViewerScreenView)
}

export type ItemsViewerScreen = ReturnType<typeof ItemsViewerScreenFactory>
