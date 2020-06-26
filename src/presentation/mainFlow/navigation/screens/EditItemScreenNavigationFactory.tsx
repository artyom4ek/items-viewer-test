import React from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

// Types imports
import { EditItemScreen } from '../../containers/EditItemScreenFactory'

export default function EditItemScreenNavigationFactory(EditItemScreen: EditItemScreen) {
  class EditItemScreenNavigation extends React.Component<{
    navigation: NavigationScreenProp<{}>
  }> {
    static navigationOptions: NavigationScreenOptions = {}

    private navigateBack = () => this.props.navigation.goBack()

    render() {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <EditItemScreen navigateBack={this.navigateBack} />
        </View>
      )
    }
  }

  return EditItemScreenNavigation
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
