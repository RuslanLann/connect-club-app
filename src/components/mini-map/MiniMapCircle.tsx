import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import { sizes } from '../../constants';
import { animationUtils } from '../../utils';

const {
  getHorizontalRightBorder,
  getHorizontalLeftBorder,
  getVerticalBorder,
  calcIsInRightCorner,
  calcIsInLeftCorner,
} = animationUtils;

interface IMiniMapCircle {
  circleCoords: ICoordinates;
  isCircleInRightCorner: ISharedValue<boolean>;
  isCircleInLeftCorner: ISharedValue<boolean>;
}

const MiniMapCircle: FC<IMiniMapCircle> = ({ circleCoords, isCircleInRightCorner, isCircleInLeftCorner }) => {
  const circleCoordsWithRatio = useDerivedValue(() => {
    return { x: circleCoords.x.value / sizes.MINI_MAP_RATIO, y: circleCoords.y.value / sizes.MINI_MAP_RATIO };
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

  return <Animated.View style={[styles.miniCircle, animatedCircleCoordsStyles]} />;
};

const MINI_CIRCLE_SIZE = sizes.VIDEO_CIRCLE_SIZE / sizes.MINI_MAP_RATIO;

const styles = StyleSheet.create({
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
export default MiniMapCircle;
