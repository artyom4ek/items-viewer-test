import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import EditItemScreenView from '../views/EditItemScreenView'

// Types imports
import { ItemsViewerModule } from '_app/domain/itemsViewer'

export default function EditItemScreenFactory(itemsViewer: ItemsViewerModule) {
  function mapStateToProps(state: any) {
    return {}
  }

  function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(
      {
        addItem: itemsViewer.actions.addItem
      },
      dispatch
    )
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditItemScreenView)
}

export type EditItemScreen = ReturnType<typeof EditItemScreenFactory>
