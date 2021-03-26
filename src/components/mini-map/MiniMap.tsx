import React, { FC } from 'react';
import { Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { animationConstants, sizes } from '../../constants';
import { animationUtils } from '../../utils';

const { animationTimingOptions } = animationConstants;
const {
  getHorizontalRightBorder,
  getHorizontalLeftBorder,
  getVerticalBorder,
  calcIsInRightCorner,
  calcIsInLeftCorner,
} = animationUtils;

interface IMiniMap {
  circleCoords: ICoordinates;
  visibleAreaCoords: ICoordinates;
}

const MiniMap: FC<IMiniMap> = ({ visibleAreaCoords, circleCoords }) => {
  const isVisibleAreaInRightCorner = useSharedValue(false);
  const isCircleInRightCorner = useSharedValue(false);
  const isVisibleAreaInLeftCorner = useSharedValue(false);
  const isCircleInLeftCorner = useSharedValue(false);

  const visibleAreaCoordsWithRatio = useDerivedValue(() => {
    return { x: visibleAreaCoords.x.value / sizes.MINI_MAP_RATIO, y: visibleAreaCoords.y.value / sizes.MINI_MAP_RATIO };
  });
  const circleCoordsWithRatio = useDerivedValue(() => {
    return { x: circleCoords.x.value / sizes.MINI_MAP_RATIO, y: circleCoords.y.value / sizes.MINI_MAP_RATIO };
  });

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

  const animatedCircleCoordsStyles = useAnimatedStyle(() => {
    const { x, y } = circleCoordsWithRatio.value;

    const horizontalRightBorder = getHorizontalRightBorder(sizes.VIDEO_CIRCLE_SIZE);
    const horizontalLeftBorder = getHorizontalLeftBorder();
    const verticalBorder = getVerticalBorder(sizes.VIDEO_CIRCLE_SIZE);

    const isInRightCorner = calcIsInRightCorner({ x, y, horizontalRightBorder, verticalBorder });
    const isInLeftCorner = calcIsInLeftCorner({ x, y, horizontalLeftBorder, verticalBorder });

    if (isInRightCorner) {
      isCircleInRightCorner.value = true;
      isCircleInLeftCorner.value = false;
    } else if (isInLeftCorner) {
      isCircleInRightCorner.value = false;
      isCircleInLeftCorner.value = true;
    } else {
      isCircleInRightCorner.value = false;
      isCircleInLeftCorner.value = false;
    }

    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  const animatedVisibleAreaStyles = useAnimatedStyle(() => {
    const { x, y } = visibleAreaCoordsWithRatio.value;

    const horizontalRightBorder = getHorizontalRightBorder(sizes.VISIBLE_AREA_WIDTH);
    const horizontalLeftBorder = getHorizontalLeftBorder();
    const verticalBorder = getVerticalBorder(sizes.VISIBLE_AREA_HEIGHT);

    const isInRightCorner = calcIsInRightCorner({ x, y, horizontalRightBorder, verticalBorder });
    const isInLeftCorner = calcIsInLeftCorner({ x, y, horizontalLeftBorder, verticalBorder });

    if (isInRightCorner) {
      isVisibleAreaInRightCorner.value = true;
      isVisibleAreaInLeftCorner.value = false;
    } else if (isInLeftCorner) {
      isVisibleAreaInRightCorner.value = false;
      isVisibleAreaInLeftCorner.value = true;
    } else {
      isVisibleAreaInRightCorner.value = false;
      isVisibleAreaInLeftCorner.value = false;
    }

    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedMiniMapStyles]}>
      <Image source={require('../../assets/images/room.jpeg')} style={styles.image} />
      <Animated.View style={[styles.visibleArea, animatedVisibleAreaStyles]} />
      <Animated.View style={[styles.miniCircle, animatedCircleCoordsStyles]} />
    </Animated.View>
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
});

export default MiniMap;
