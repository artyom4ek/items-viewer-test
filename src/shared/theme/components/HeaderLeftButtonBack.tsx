import React, { PureComponent } from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'

import { images } from '..'

export default class HeaderLeftButtonBack extends PureComponent<{
  color?: string
  customStyle?: ViewStyle

  onPress: () => void
}> {
  render() {
    const { color, customStyle } = this.props
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={customStyle ? [styles.container, customStyle] : styles.container}
      >
        <images.Back fill={color} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15
  }
})
