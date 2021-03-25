import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const SCREEN_RATIO = height / width;

const ROOM_WIDTH = width / 2;
const ROOM_HEIGHT = height / 2;
const ROOM_VISIBLE_PART_WIDTH = width / 4;
const ROOM_VISIBLE_PART_HEIGHT = height / 4;

const IMAGE_RATIO = 2.165;

const VIDEO_CIRCLE_SIZE = 30;

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_RATIO,
  ROOM_WIDTH,
  ROOM_HEIGHT,
  ROOM_VISIBLE_PART_WIDTH,
  ROOM_VISIBLE_PART_HEIGHT,
  IMAGE_RATIO,
  VIDEO_CIRCLE_SIZE,
};
