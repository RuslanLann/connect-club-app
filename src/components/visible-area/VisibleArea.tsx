import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { sizes } from '../../constants';

const VisibleArea: FC = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
  });

  const animatedCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.visibleArea, animatedCircleStyles]}>
        <View style={[styles.hiddenArea, styles.topHiddenArea]} />
        <View style={[styles.hiddenArea, styles.rightHiddenArea]} />
        <View style={[styles.hiddenArea, styles.bottomHiddenArea]} />
        <View style={[styles.hiddenArea, styles.leftHiddenArea]} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  visibleArea: {
    width: sizes.VISIBLE_AREA_WIDTH,
    height: sizes.VISIBLE_AREA_HEIGHT,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  hiddenArea: {
    width: sizes.SCREEN_WIDTH * 3,
    height: sizes.SCREEN_HEIGHT,
    backgroundColor: 'white',
    position: 'absolute',
  },
  topHiddenArea: {
    top: -sizes.SCREEN_HEIGHT,
    left: -sizes.SCREEN_WIDTH,
  },
  rightHiddenArea: {
    top: 0,
    right: -sizes.SCREEN_WIDTH * 3,
  },
  bottomHiddenArea: {
    bottom: -sizes.SCREEN_HEIGHT,
    left: -sizes.SCREEN_WIDTH,
  },
  leftHiddenArea: {
    top: 0,
    left: -sizes.SCREEN_WIDTH * 3,
  },
});

export default VisibleArea;
