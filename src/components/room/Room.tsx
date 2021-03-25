import React, { FC } from 'react';
import { View, StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native';

import { sizes } from '../../constants';

const Room: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/room.jpeg')} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.SCREEN_WIDTH / 4,
    height: sizes.SCREEN_HEIGHT / 4,
    overflow: 'hidden',
    backgroundColor: 'red',
  } as ViewStyle,
  image: {
    width: sizes.SCREEN_WIDTH / 2,
    height: sizes.SCREEN_HEIGHT / 2,
  } as ImageStyle,
});

export default Room;
