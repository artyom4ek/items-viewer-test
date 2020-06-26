import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface Props {
  selected: boolean
  style?: StyleProp<ViewStyle>

  onPress: () => void
}

class RadioButton extends PureComponent<Props> {
  render() {
    const { selected, style, onPress } = this.props
    return (
      <TouchableOpacity style={[styles.circle, style]} onPress={onPress}>
        {selected && <View style={styles.checkedCircle} />}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center'
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4A4A4A'
  }
})

export default RadioButton
