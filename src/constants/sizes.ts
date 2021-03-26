import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('screen');
const { height: windowHeight } = Dimensions.get('window');

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0;

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const SCREEN_RATIO = height / width;
const SCREEN_HEIGHT_WITHOUT_STATUS_BAR = SCREEN_HEIGHT - STATUS_BAR_HEIGHT;

const PADDING = 15;

const VISIBLE_AREA_WIDTH = SCREEN_WIDTH / 4;
const VISIBLE_AREA_HEIGHT = SCREEN_HEIGHT_WITHOUT_STATUS_BAR / 4;

const IMAGE_RATIO = 2.165;

const VIDEO_CIRCLE_SIZE = 30;

const MINI_MAP_RATIO = 4;
const MINI_MAP_WIDTH = SCREEN_WIDTH / MINI_MAP_RATIO;
const MINI_MAP_HEIGHT = SCREEN_HEIGHT_WITHOUT_STATUS_BAR / MINI_MAP_RATIO;
const MINI_MAP_LEFT_POSITION = -SCREEN_WIDTH + MINI_MAP_WIDTH + PADDING * 2;
const MINI_MAP_TOP_POSITION =
  -windowHeight + MINI_MAP_HEIGHT - PADDING + (Platform.OS === 'ios' ? SCREEN_HEIGHT / 11 : 0);

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
