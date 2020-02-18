import React, {PureComponent} from 'react';
import {Text, StyleSheet} from 'react-native';

import MyFontIcons from './MyFont';

interface Props {
  style?: any;
  color?: any;
}

class MyFontIcon extends PureComponent<Props> {
  // setNativeProps(nativeProps) {
  //   this._root.setNativeProps(nativeProps);
  // }

  render() {
    const {style, color, children} = this.props;

    return (
      <Text
        style={[styles.icon, {color}, style]}
        // ref={component => (this._root = component)}
      >
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'satekicon',
    backgroundColor: 'transparent',
    fontSize: 19,
  },
});

export {MyFontIcons};
export default MyFontIcon;
