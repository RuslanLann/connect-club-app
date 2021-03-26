import React, { FC } from 'react';
import { StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withTiming } from 'react-native-reanimated';

import VideoCircle from '../video-circle/VideoCircle';
import VisibleArea from '../visible-area/VisibleArea';
import MiniMap from '../mini-map/MiniMap';
import { animationConstants, sizes } from '../../constants';

const Room: FC = () => {
  const circleX = useSharedValue(0);
  const circleY = useSharedValue(0);
  const visibleAreaX = useSharedValue(0);
  const visibleAreaY = useSharedValue(0);

  const eventHandler = useAnimatedGestureHandler({
    onEnd: (event) => {
      circleX.value = withTiming(event.x - sizes.VIDEO_CIRCLE_SIZE / 2, animationConstants.animationTimingOptions);
      circleY.value = withTiming(event.y - sizes.VIDEO_CIRCLE_SIZE / 2, animationConstants.animationTimingOptions);
      visibleAreaX.value = withTiming(event.x - sizes.MINI_MAP_WIDTH / 2, {
        easing: animationConstants.animationTimingOptions.easing,
        duration: 800,
      });
      visibleAreaY.value = withTiming(event.y - sizes.MINI_MAP_HEIGHT / 2, {
        easing: animationConstants.animationTimingOptions.easing,
        duration: 800,
      });
    },
  });

  return (
    <TapGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={styles.container}>
        <Image source={require('../../assets/images/room.jpeg')} style={styles.image} resizeMode="stretch" />
        <VisibleArea coords={{ x: visibleAreaX, y: visibleAreaY }} />
        <VideoCircle coords={{ x: circleX, y: circleY }} />
        <MiniMap circleCoords={{ x: circleX, y: circleY }} visibleAreaCoords={{ x: visibleAreaX, y: visibleAreaY }} />
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
