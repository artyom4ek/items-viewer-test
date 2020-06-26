import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import { Header, HeaderLeftButtonBack, BottomBarView, images, v } from '../../../shared/theme'

// Types imports
import { Item } from '_app/domain/itemsViewer'

interface Props {
  addItem: (item: Item) => void
  navigateBack: () => void
}

interface State {
  itemName: string
  imageSource?: string
  isFirst: boolean
  isEmpty: boolean
}

class EditItemScreenView extends PureComponent<Props, State> {
  state: State = {
    itemName: '',
    isFirst: true,
    isEmpty: true
  }

  private onPressDone = () => {
    this.props.addItem({
      id: new Date().getTime(),
      name: this.state.itemName,
      image: this.state.imageSource
    })
    this.props.navigateBack()
  }

  /* Main content */
  private checkItemNameLength = (itemName: string) => {
    this.setState({
      itemName: itemName.trim(),
      isEmpty: itemName === '',
      isFirst: false
    })
  }

  private selectImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    try {
      ImagePicker.showImagePicker(options, response => {
        if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else {
          this.setState({
            imageSource: response.uri
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  private renderImagePreview() {
    if (this.state.imageSource) {
      return <Image source={{ uri: this.state.imageSource }} style={styles.itemImagePreview} />
    } else {
      return null
    }
  }

  render() {
    const { isEmpty, isFirst, itemName } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header
          headerStyle='light'
          title={'Edit Item'}
          LeftButton={() => (
            <HeaderLeftButtonBack customStyle={styles.back} onPress={this.props.navigateBack} />
          )}
        />
        <ScrollView style={styles.content}>
          <View style={styles.dataContainer}>
            <View style={styles.inputDataContainer}>
              <TextInput
                placeholder='Type your item name...'
                underlineColorAndroid='transparent'
                style={[
                  styles.inputItemName,
                  { borderColor: !isEmpty || isFirst ? '#DCDCDC' : v.colors.danger }
                ]}
                maxLength={255}
                onChangeText={this.checkItemNameLength}
                onBlur={() => this.setState({ isEmpty: itemName === '', isFirst: false })}
                returnKeyType='done'
              />
              <TouchableOpacity style={styles.pictureContainer} onPress={this.selectImage}>
                <images.Picture />
              </TouchableOpacity>
            </View>
            <View style={styles.errorContainer}>
              {isEmpty && !isFirst && (
                <Text style={styles.errorMesssage}>Minimum length of Item name - 1 symbol</Text>
              )}
            </View>
            <View style={styles.imagePreviewContainer}>{this.renderImagePreview()}</View>
          </View>
        </ScrollView>
        <BottomBarView fabEnabled={isEmpty} fabType='done' onPress={this.onPressDone} />
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
  back: {
    paddingLeft: 5
  },

  inputItemName: {
    flex: 1,
    height: 40,
    paddingLeft: 5,
    borderWidth: 1
  },

  dataContainer: {
    marginTop: 10,
    marginHorizontal: 15
  },
  inputDataContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  imagePreviewContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImagePreview: {
    width: '100%',
    height: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 3
  },
  pictureContainer: {
    marginStart: 10
  },
  errorContainer: {
    height: 15
  },
  errorMesssage: {
    marginTop: 2,
    fontSize: 12,
    color: v.colors.danger
  }
})

export default EditItemScreenView
