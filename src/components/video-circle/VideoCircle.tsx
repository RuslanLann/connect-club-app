import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { sizes } from '../../constants';
import Camera from './Camera';

interface IVideoCircle {
  circleCoords: ICircleCoordinates;
}

const SECOND_CIRCLE_SIZE = sizes.VIDEO_CIRCLE_SIZE * 3;

const VideoCircle: FC<IVideoCircle> = ({ circleCoords: { x, y } }) => {
  const scale = useSharedValue(1);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      scale.value = withSpring(0.9);
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
      scale.value = withSpring(1);
    },
  });

  const animatedCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }, { scale: scale.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.circle, animatedCircleStyles]}>
        <View style={styles.cameraContainer}>
          <Camera />
        </View>
        <View style={styles.audibilityZone} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: sizes.VIDEO_CIRCLE_SIZE,
    height: sizes.VIDEO_CIRCLE_SIZE,
    position: 'absolute',
    top: 0,
    left: 0,
  } as ViewStyle,
  cameraContainer: {
    width: sizes.VIDEO_CIRCLE_SIZE,
    height: sizes.VIDEO_CIRCLE_SIZE,
    overflow: 'hidden',
    borderColor: 'blue',
    borderRadius: sizes.VIDEO_CIRCLE_SIZE,
    borderWidth: 1,
    zIndex: 2,
  } as ViewStyle,
  audibilityZone: {
    width: SECOND_CIRCLE_SIZE,
    height: SECOND_CIRCLE_SIZE,
    borderRadius: SECOND_CIRCLE_SIZE,
    backgroundColor: 'white',
    opacity: 0.3,
    position: 'absolute',
    top: -(SECOND_CIRCLE_SIZE - sizes.VIDEO_CIRCLE_SIZE) / 2,
    left: -(SECOND_CIRCLE_SIZE - sizes.VIDEO_CIRCLE_SIZE) / 2,
    zIndex: 1,
  } as ViewStyle,
});

export default VideoCircle;
