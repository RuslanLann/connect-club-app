import React, { FC } from 'react';
import { StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import VideoCircle from '../video-circle/VideoCircle';
import VisibleArea from '../visible-area/VisibleArea';
import MiniMap from '../mini-map/MiniMap';
import { animationConstants, sizes } from '../../constants';

const Room: FC = () => {
  const circleX = useSharedValue(0);
  const circleY = useSharedValue(0);
  const visibleAreaX = useSharedValue(0);
  const visibleAreaY = useSharedValue(0);
  const isMiniMapVisible = useSharedValue(true);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, cxt) => {},
    onActive: (event, cxt) => {
      console.log(event.y, 'event.y <<<<');
      const verticalBorderCross =
        event.y > sizes.SCREEN_HEIGHT - sizes.MINI_MAP_HEIGHT - sizes.PADDING - sizes.VIDEO_CIRCLE_SIZE;
      const horizontalBorderCross =
        event.x > sizes.SCREEN_WIDTH - sizes.MINI_MAP_WIDTH - sizes.PADDING - sizes.VIDEO_CIRCLE_SIZE;

      if (verticalBorderCross && horizontalBorderCross) {
        isMiniMapVisible.value = false;
      } else {
        isMiniMapVisible.value = true;
      }
    },
    onEnd: (event) => {
      circleX.value = withTiming(event.x - sizes.VIDEO_CIRCLE_SIZE / 2, animationConstants.animationTimingOptions);
      circleY.value = withTiming(event.y - sizes.VIDEO_CIRCLE_SIZE / 2, animationConstants.animationTimingOptions);
    },
  });

  const animatedMiniMapStyles = useAnimatedStyle(() => {
    const translateXValue = isMiniMapVisible.value ? 0 : sizes.SCREEN_WIDTH;
    return {
      transform: [{ translateX: withTiming(translateXValue, animationConstants.animationTimingOptions) }],
    };
  });

  return (
    <TapGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={styles.container}>
        <Image source={require('../../assets/images/room.jpeg')} style={styles.image} resizeMode="stretch" />
        <VisibleArea coords={{ x: visibleAreaX, y: visibleAreaY }} />
        <VideoCircle coords={{ x: circleX, y: circleY }} />
        <MiniMap
          circleCoords={{ x: circleX, y: circleY }}
          visibleAreaCoords={{ x: visibleAreaX, y: visibleAreaY }}
          animatedStyles={animatedMiniMapStyles}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  image: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
});

export default Room;
