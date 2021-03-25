import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface IVideoCircle {
  size?: number;
}

const VideoCircle: FC<IVideoCircle> = ({ size = 5 }) => {
  return <View style={[styles.circle, { width: size, height: size, borderRadius: size }]} />;
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
