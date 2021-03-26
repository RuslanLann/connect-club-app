import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { sizes } from '../../constants';

const Camera = () => {
  return (
    <RNCamera
      style={styles.frontCamera}
      type={RNCamera.Constants.Type.front}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
  );
};

const styles = StyleSheet.create({
  frontCamera: {
    width: sizes.VIDEO_CIRCLE_SIZE,
    height: sizes.VIDEO_CIRCLE_SIZE,
  } as ViewStyle,
});

export default Camera;
