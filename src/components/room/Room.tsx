import React, { FC } from 'react';
import { View, StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native';
import { VideoCircle } from '..';

import { sizes } from '../../constants';

const VIDEO_CIRCLE_SIZE = sizes.SCREEN_WIDTH / 15;

const Room: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/room.jpeg')} style={styles.image} resizeMode="stretch" />
      <VideoCircle size={VIDEO_CIRCLE_SIZE} />
    </View>
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
