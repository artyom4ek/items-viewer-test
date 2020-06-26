import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { v } from '..'

interface Props {
  title: string
  textColor?: string
  backgroundColor?: string

  LeftButton?: React.ComponentType<any> | JSX.Element | null
  RightButton?: React.ComponentType<any> | JSX.Element | null
}

export default class CustomHeader extends PureComponent<Props> {
  _renderElementOrComponent(value: React.ComponentType<any> | JSX.Element | null) {
    if (React.isValidElement(value) || value === null) {
      return value
    }

    const Component = value as React.ComponentType<any>
    return <Component />
  }

  render() {
    const { title, textColor, backgroundColor, LeftButton, RightButton } = this.props
    return (
      <View style={[styles.header, backgroundColor ? { backgroundColor } : undefined]}>
        <View style={styles.leftContainer}>
          {LeftButton && this._renderElementOrComponent(LeftButton)}
        </View>

        <View style={styles.centerContainer}>
          <Text style={[textColor ? { color: textColor } : undefined, styles.title]}>{title}</Text>
        </View>

        <View style={styles.rightContainer}>
          {RightButton && this._renderElementOrComponent(RightButton)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: 60,
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
  title: {
    fontSize: 28,
    color: v.colors.title,
    fontWeight: '200'
  },
  leftContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  }
})
