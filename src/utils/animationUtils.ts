import { sizes } from '../constants';

const getHorizontalRightBorder = (elementWidth: number) => {
  'worklet';
  return (sizes.SCREEN_WIDTH - sizes.MINI_MAP_WIDTH - sizes.PADDING - elementWidth) / sizes.MINI_MAP_RATIO;
};

const getHorizontalLeftBorder = () => {
  'worklet';
  return (sizes.MINI_MAP_WIDTH + sizes.PADDING) / sizes.MINI_MAP_RATIO;
};

const getVerticalBorder = (elementHeight: number) => {
  'worklet';
  return (sizes.SCREEN_HEIGHT - sizes.MINI_MAP_HEIGHT - sizes.PADDING - elementHeight) / sizes.MINI_MAP_RATIO;
};

const calcIsInRightCorner = ({ x, y, horizontalRightBorder, verticalBorder }: IGetRightCorner) => {
  'worklet';
  return x > horizontalRightBorder && y > verticalBorder;
};

const calcIsInLeftCorner = ({ x, y, horizontalLeftBorder, verticalBorder }: IGetLeftCorner) => {
  'worklet';
  return x < horizontalLeftBorder && y > verticalBorder;
};

export default {
  getHorizontalRightBorder,
  getHorizontalLeftBorder,
  getVerticalBorder,
  calcIsInRightCorner,
  calcIsInLeftCorner,
};
