import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ListRenderItemInfo
} from 'react-native'

import { BottomBarView, v, RadioButton, images } from '../../../shared/theme'

// Types imports
import { Item } from '_app/domain/itemsViewer'

interface Props {
  items: Array<Item>

  deleteItem: (id: number) => void
  navigateToEditItem: (item?: Item) => void
}

interface State {
  selectedItem: number
}

class ItemsViewerScreenView extends PureComponent<Props, State> {
  state: State = {
    selectedItem: -1
  }

  private onSelectItem(id: number) {
    this.setState({
      selectedItem: id
    })
  }

  private onPressAdd = () => this.props.navigateToEditItem()

  private deleteConfirmationAlert = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.deleteItem(this.state.selectedItem)
            this.setState({ selectedItem: -1 })
          }
        }
      ],
      { cancelable: false }
    )
  }

  private renderListHeader() {
    const { items } = this.props
    const { selectedItem } = this.state

    return items.length !== 0 ? (
      <View style={styles.listHeaderContainer}>
        <Text style={styles.title}>React Native</Text>
        <TouchableOpacity
          style={styles.trashContainer}
          disabled={selectedItem === -1}
          onPress={this.deleteConfirmationAlert}
        >
          <images.Trash fill={selectedItem !== -1 ? v.colors.danger : v.colors.textDarker} />
        </TouchableOpacity>
      </View>
    ) : null
  }

  private renderListEmpty() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No items yet</Text>
        <Text style={styles.emptyDescription}>Tap "+" button to add new item</Text>
      </View>
    )
  }

  private renderItem = ({ item }: ListRenderItemInfo<Item>) => {
    const { selectedItem } = this.state
    return (
      <TouchableOpacity onPress={() => this.onSelectItem(item.id)}>
        <View
          style={[
            styles.row,
            this.state.selectedItem === item.id && { backgroundColor: '#fafafa' }
          ]}
        >
          <View style={styles.radioButtonContainer}>
            <RadioButton
              selected={selectedItem === item.id}
              onPress={() => {
                this.setState({
                  selectedItem: item.id
                })
              }}
            />
          </View>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode={'tail'}>
            {item.name}
          </Text>
          {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
        </View>
      </TouchableOpacity>
    )
  }

  private keyExtractor = (item: Item, index: number) => 'key_' + index + '_' + item.id

  render() {
    const { items } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={styles.listContentContainer}
          disableVirtualization={false}
          ListHeaderComponent={this.renderListHeader()}
          ListEmptyComponent={this.renderListEmpty()}
        />
        <BottomBarView fabType='add' onPress={this.onPressAdd} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  row: {
    flex: 1,
    height: 55,
    paddingEnd: 12,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: v.colors.border
  },
  title: {
    flex: 1,
    marginStart: 18,
    fontSize: 28,
    color: v.colors.title,
    fontWeight: '200'
  },
  emptyContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 25
  },
  listHeaderContainer: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4
  },
  trashContainer: {
    height: 60,
    width: 40,
    marginEnd: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#4A4A4A'
  },
  emptyDescription: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#69747D'
  },

  radioButtonContainer: {
    width: 55,
    alignItems: 'center'
  },
  itemName: {
    flex: 1,
    color: v.colors.title
  },
  itemImage: {
    width: 65,
    height: 40,
    marginStart: 5
  }
})

export default ItemsViewerScreenView
