import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const { height: windowHeight } = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const SCREEN_RATIO = height / width;

const PADDING = 15;

const VISIBLE_AREA_WIDTH = width / 4;
const VISIBLE_AREA_HEIGHT = height / 4;

const IMAGE_RATIO = 2.165;

const VIDEO_CIRCLE_SIZE = 30;

const MINI_MAP_RATIO = 4;
const MINI_MAP_WIDTH = SCREEN_WIDTH / MINI_MAP_RATIO;
const MINI_MAP_HEIGHT = SCREEN_HEIGHT / MINI_MAP_RATIO;
const MINI_MAP_LEFT_POSITION = -SCREEN_WIDTH + MINI_MAP_WIDTH + PADDING * 2;
const MINI_MAP_TOP_POSITION = -windowHeight + MINI_MAP_HEIGHT - PADDING;

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_RATIO,
  VISIBLE_AREA_WIDTH,
  VISIBLE_AREA_HEIGHT,
  IMAGE_RATIO,
  VIDEO_CIRCLE_SIZE,
  MINI_MAP_RATIO,
  MINI_MAP_WIDTH,
  MINI_MAP_HEIGHT,
  MINI_MAP_LEFT_POSITION,
  MINI_MAP_TOP_POSITION,
  PADDING,
};
