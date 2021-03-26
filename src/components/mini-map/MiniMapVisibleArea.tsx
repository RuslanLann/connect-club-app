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

interface IMiniMapVisibleArea {
  visibleAreaCoords: ICoordinates;
  isVisibleAreaInRightCorner: ISharedValue<boolean>;
  isVisibleAreaInLeftCorner: ISharedValue<boolean>;
}

const MiniMapVisibleArea: FC<IMiniMapVisibleArea> = ({
  visibleAreaCoords,
  isVisibleAreaInRightCorner,
  isVisibleAreaInLeftCorner,
}) => {
  const visibleAreaCoordsWithRatio = useDerivedValue(() => {
    return { x: visibleAreaCoords.x.value / sizes.MINI_MAP_RATIO, y: visibleAreaCoords.y.value / sizes.MINI_MAP_RATIO };
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

  return <Animated.View style={[styles.visibleArea, animatedVisibleAreaStyles]} />;
};

const styles = StyleSheet.create({
  visibleArea: {
    width: sizes.MINI_MAP_WIDTH / 4,
    height: sizes.MINI_MAP_HEIGHT / 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    left: 0,
    top: 0,
  } as ViewStyle,
});

export default MiniMapVisibleArea;
