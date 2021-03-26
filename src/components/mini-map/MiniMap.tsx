import React, { FC } from 'react';
import { Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { animationConstants, sizes } from '../../constants';

interface IMiniMap {
  circleCoords: ICoordinates;
  visibleAreaCoords: ICoordinates;
}

const MiniMap: FC<IMiniMap> = ({ visibleAreaCoords, circleCoords }) => {
  const isVisibleAreaInMiniMapZone = useSharedValue(false);
  const isCircleInMiniMapZone = useSharedValue(false);

  const visibleAreaCoordsWithRatio = useDerivedValue(() => {
    return { x: visibleAreaCoords.x.value / sizes.MINI_MAP_RATIO, y: visibleAreaCoords.y.value / sizes.MINI_MAP_RATIO };
  });
  const circleCoordsWithRatio = useDerivedValue(() => {
    return { x: circleCoords.x.value / sizes.MINI_MAP_RATIO, y: circleCoords.y.value / sizes.MINI_MAP_RATIO };
  });

  const animatedMiniMapStyles = useAnimatedStyle(() => {
    const leftCorner = -sizes.SCREEN_WIDTH + sizes.MINI_MAP_WIDTH + sizes.PADDING * 2;

    const translateXValue = isVisibleAreaInMiniMapZone.value || isCircleInMiniMapZone.value ? leftCorner : 0;
    return {
      transform: [{ translateX: withTiming(translateXValue, animationConstants.animationTimingOptions) }],
    };
  });

  const animatedCircleCoordsStyles = useAnimatedStyle(() => {
    const { x, y } = circleCoordsWithRatio.value;

    const horizontalBorder =
      (sizes.SCREEN_WIDTH - sizes.MINI_MAP_WIDTH - sizes.PADDING - sizes.VIDEO_CIRCLE_SIZE) / sizes.MINI_MAP_RATIO;
    const verticalBorder =
      (sizes.SCREEN_HEIGHT - sizes.MINI_MAP_HEIGHT - sizes.PADDING - sizes.VIDEO_CIRCLE_SIZE) / sizes.MINI_MAP_RATIO;

    const horizontalBorderCross = x > horizontalBorder;
    const verticalBorderCross = y > verticalBorder;

    if (horizontalBorderCross && verticalBorderCross) {
      isCircleInMiniMapZone.value = true;
    } else {
      isCircleInMiniMapZone.value = false;
    }

    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });
  const animatedVisibleAreaStyles = useAnimatedStyle(() => {
    const { x, y } = visibleAreaCoordsWithRatio.value;

    const horizontalBorder =
      (sizes.SCREEN_WIDTH - sizes.MINI_MAP_WIDTH - sizes.PADDING - sizes.VISIBLE_AREA_WIDTH) / sizes.MINI_MAP_RATIO;
    const verticalBorder =
      (sizes.SCREEN_HEIGHT - sizes.MINI_MAP_HEIGHT - sizes.PADDING - sizes.VISIBLE_AREA_HEIGHT) / sizes.MINI_MAP_RATIO;

    const horizontalBorderCross = x > horizontalBorder;
    const verticalBorderCross = y > verticalBorder;

    if (horizontalBorderCross && verticalBorderCross) {
      isVisibleAreaInMiniMapZone.value = true;
    } else {
      isVisibleAreaInMiniMapZone.value = false;
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
