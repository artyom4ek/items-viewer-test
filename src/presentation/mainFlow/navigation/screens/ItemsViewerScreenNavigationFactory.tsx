import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

// Types imports
import { ItemsViewerScreen } from '../../containers/ItemsViewerScreenFactory'

export default function ItemsViewerScreenNavigationFactory(ItemsViewerScreen: ItemsViewerScreen) {
  class ItemsViewerScreenNavigation extends React.Component<{
    navigation: NavigationScreenProp<{}>
  }> {
    static navigationOptions: NavigationScreenOptions = {}

    private navigateToEditItem = () => this.props.navigation.navigate('EditItem')

    render() {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <ItemsViewerScreen navigateToEditItem={this.navigateToEditItem} />
        </View>
      )
    }
  }

  return ItemsViewerScreenNavigation
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
