import React, { FC } from 'react';
import { View, StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native';

import VideoCircle from '../video-circle/VideoCircle';

const Room: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/room.jpeg')} style={styles.image} resizeMode="stretch" />
      <VideoCircle size={30} />
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
