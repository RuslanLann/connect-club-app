import React, { FC } from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';

import { sizes } from '../../constants';

const MiniMap: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/room.jpeg')} style={styles.image} />
      <View style={styles.visibleArea} />
      <View style={styles.miniCircle} />
      <View style={styles.closeButton} />
    </View>
  );
};

const MINI_CIRCLE_SIZE = sizes.VIDEO_CIRCLE_SIZE / sizes.MINI_MAP_RATIO;

const styles = StyleSheet.create({
  container: {
    width: sizes.MINI_MAP_WIDTH,
    height: sizes.MINI_MAP_HEIGHT,
    position: 'absolute',
    right: 15,
    bottom: 15,
    overflow: 'hidden',
    opacity: 0.6,
  } as ViewStyle,
  image: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  visibleArea: {
    width: sizes.MINI_MAP_WIDTH / 4,
    height: sizes.MINI_MAP_HEIGHT / 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    left: 0,
    top: 0,
  } as ViewStyle,
  miniCircle: {
    width: MINI_CIRCLE_SIZE,
    height: MINI_CIRCLE_SIZE,
    backgroundColor: 'blue',
    borderRadius: MINI_CIRCLE_SIZE,
    position: 'absolute',
    left: 0,
    top: 0,
  } as ViewStyle,
  closeButton: {},
});

export default MiniMap;
