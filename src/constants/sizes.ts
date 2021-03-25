import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
