import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { sizes } from '../../constants';

const VisibleArea: FC = () => {
  return (
    <View style={styles.visibleArea}>
      <View style={[styles.hiddenArea, styles.topHiddenArea]} />
      <View style={[styles.hiddenArea, styles.rightHiddenArea]} />
      <View style={[styles.hiddenArea, styles.bottomHiddenArea]} />
      <View style={[styles.hiddenArea, styles.leftHiddenArea]} />
    </View>
  );
};

const styles = StyleSheet.create({
  visibleArea: {
    width: sizes.VISIBLE_AREA_WIDTH,
    height: sizes.VISIBLE_AREA_HEIGHT,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 11,
  },
  hiddenArea: {
    width: sizes.SCREEN_WIDTH,
    height: sizes.SCREEN_HEIGHT,
    backgroundColor: 'white',
    position: 'absolute',
  },
  topHiddenArea: {
    top: -sizes.SCREEN_HEIGHT,
    left: 0,
  },
  rightHiddenArea: {
    top: 0,
    right: -sizes.SCREEN_WIDTH,
  },
  bottomHiddenArea: {
    bottom: -sizes.SCREEN_HEIGHT,
    left: 0,
  },
  leftHiddenArea: {
    top: 0,
    left: -sizes.SCREEN_WIDTH,
  },
});

export default VisibleArea;
