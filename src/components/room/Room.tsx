import React, { FC } from 'react';
import { StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedGestureHandler, useSharedValue, withTiming } from 'react-native-reanimated';

import VideoCircle from '../video-circle/VideoCircle';
import VisibleArea from '../visible-area/VisibleArea';
import { sizes } from '../../constants';

const Room: FC = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const eventHandler = useAnimatedGestureHandler({
    onEnd: (event) => {
      const animationTimingOptions = {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      };

      x.value = withTiming(event.x - sizes.VIDEO_CIRCLE_SIZE / 2, animationTimingOptions);
      y.value = withTiming(event.y - sizes.VIDEO_CIRCLE_SIZE / 2, animationTimingOptions);
    },
  });

  return (
    <TapGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={styles.container}>
        <Image source={require('../../assets/images/room.jpeg')} style={styles.image} resizeMode="stretch" />
        <VisibleArea />
        <VideoCircle size={sizes.VIDEO_CIRCLE_SIZE} circleCoords={{ x, y }} />
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
