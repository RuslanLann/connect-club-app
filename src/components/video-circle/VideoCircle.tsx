import React, { FC } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface IVideoCircle {
  size?: number;
}

const startingPosition = 0;

const VideoCircle: FC<IVideoCircle> = ({ size = 5 }) => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const scale = useSharedValue(1);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
      scale.value = withSpring(0.9);
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
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
      <Animated.View style={[styles.circle, { width: size, height: size, borderRadius: size }, animatedCircleStyles]} />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'blue',
    position: 'absolute',
    top: 0,
    left: 0,
  } as ViewStyle,
});

export default VideoCircle;
