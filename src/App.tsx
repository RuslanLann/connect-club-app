import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { MiniMap, Room } from './components';

const App = () => {
  return (
    <View style={styles.container}>
      <Room />
      <MiniMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  } as ViewStyle,
});

export default App;
