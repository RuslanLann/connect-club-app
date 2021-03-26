import { Easing } from 'react-native-reanimated';

const animationTimingOptions = {
  duration: 500,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export default {
  animationTimingOptions,
};
