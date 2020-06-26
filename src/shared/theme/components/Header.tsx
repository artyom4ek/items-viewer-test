import React, { PureComponent } from 'react'

import { v, CustomHeader } from '..'

type HeaderStyle = 'light' | 'dark'

interface Props {
  title: string
  headerStyle?: HeaderStyle

  LeftButton?: React.ComponentType<any> | null
  RightButton?: React.ComponentType<any> | null
}

export default class Header extends PureComponent<Props> {
  render() {
    const { title, LeftButton, RightButton } = this.props
    const headerStyle = this.props.headerStyle || 'dark'

    return (
      <CustomHeader
        title={title}
        textColor={headerStyle === 'dark' ? v.colors.contentBackground : v.colors.title}
        backgroundColor={headerStyle === 'dark' ? v.colors.primary : v.colors.contentBackground}
        LeftButton={LeftButton}
        RightButton={RightButton}
      />
    )
  }
}
