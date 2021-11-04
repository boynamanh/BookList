import React from 'react';
import {StyleSheet, Image, ImageSourcePropType} from 'react-native';

type TabbarIconProps = {
  icon: ImageSourcePropType;
  color?: string;
};

const TabBarIcon: React.FC<TabbarIconProps> = ({color, icon}) => {
  return (
    <Image
      style={[styles.image, {backgroundColor: color}]}
      source={icon}
      resizeMode="stretch"
      accessibilityIgnoresInvertColors
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 26,
    height: 26,
  },
  title: {
    fontStyle: 'normal',
    marginTop: 4,
  },
});

export default TabBarIcon;
