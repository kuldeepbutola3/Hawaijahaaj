import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { appColors } from '../../styles/appColors';
import { AppImage } from '../assests/image';

export const AppLogo: React.FC<{ size: number }> = ({ size }) => {
  const height = 0.9057 * size;
  const width = (492 / 624) * height;
  return (
    <View
      style={{
        ...styles.imageContainer,
        height: size,
        width: size,
        borderRadius: size / 2,
      }}>
      <Image style={{ height, width }} source={AppImage.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
