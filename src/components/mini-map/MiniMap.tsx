import React, { FC } from 'react';
import { Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { animationConstants, sizes } from '../../constants';
import MiniMapCircle from './MiniMapCircle';
import MiniMapVisibleArea from './MiniMapVisibleArea';

const { animationTimingOptions } = animationConstants;

interface IMiniMap {
  circleCoords: ICoordinates;
  visibleAreaCoords: ICoordinates;
}

const MiniMap: FC<IMiniMap> = ({ visibleAreaCoords, circleCoords }) => {
  const isVisibleAreaInRightCorner = useSharedValue(false);
  const isCircleInRightCorner = useSharedValue(false);
  const isVisibleAreaInLeftCorner = useSharedValue(false);
  const isCircleInLeftCorner = useSharedValue(false);

  const animatedMiniMapStyles = useAnimatedStyle(() => {
    let translateXValue = 0,
      translateYValue = 0;
    const bottomrightCorner = { x: 0, y: 0 };
    const bottomLeftCorner = { x: sizes.MINI_MAP_LEFT_POSITION, y: 0 };
    const topLeftCorner = { x: sizes.MINI_MAP_LEFT_POSITION, y: sizes.MINI_MAP_TOP_POSITION };

    if (
      (isVisibleAreaInRightCorner.value || isCircleInRightCorner.value) &&
      !isVisibleAreaInLeftCorner.value &&
      !isCircleInLeftCorner.value
    ) {
      translateXValue = bottomLeftCorner.x;
      translateYValue = bottomLeftCorner.y;
    } else if (
      (isVisibleAreaInLeftCorner.value && isCircleInRightCorner.value) ||
      (isVisibleAreaInRightCorner.value && isCircleInLeftCorner.value)
    ) {
      translateXValue = topLeftCorner.x;
      translateYValue = topLeftCorner.y;
    } else {
      // default MiniMap corner
      translateYValue = bottomrightCorner.x;
      translateYValue = bottomrightCorner.y;
    }

    return {
      transform: [
        { translateX: withTiming(translateXValue, animationTimingOptions) },
        { translateY: withTiming(translateYValue, animationTimingOptions) },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedMiniMapStyles]}>
      <Image source={require('../../assets/images/room.jpeg')} style={styles.image} />
      <MiniMapVisibleArea
        visibleAreaCoords={visibleAreaCoords}
        isVisibleAreaInRightCorner={isVisibleAreaInRightCorner}
        isVisibleAreaInLeftCorner={isVisibleAreaInLeftCorner}
      />
      <MiniMapCircle
        circleCoords={circleCoords}
        isCircleInRightCorner={isCircleInRightCorner}
        isCircleInLeftCorner={isCircleInLeftCorner}
      />
    </Animated.View>
  );
};

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
});

export default MiniMap;
