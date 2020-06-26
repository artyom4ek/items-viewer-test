import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { images } from '..'

type FabType = 'add' | 'done'

interface Props {
  fabType: FabType
  fabEnabled?: boolean

  onPress: () => void
}

class BottomBarView extends PureComponent<Props> {
  render() {
    const { fabType, fabEnabled, onPress } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.fabContainer}>
          <TouchableOpacity
            disabled={fabEnabled ? fabEnabled : false}
            style={[
              styles.fabButton,
              { backgroundColor: !fabEnabled ? '#000' : 'rgba(0,0,0,0.2)' }
            ]}
            onPress={onPress}
          >
            {fabType === 'add' ? <images.Add /> : <images.Done />}
          </TouchableOpacity>
        </View>
        <View style={styles.row} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  fabContainer: {
    //position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 62,
    height: 62,
    borderRadius: 31,
    bottom: 25,
    zIndex: 10
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: 3,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    position: 'absolute',
    width: '100%',
    height: 60,
    backgroundColor: '#3F51B5',
    bottom: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})

export default BottomBarView
