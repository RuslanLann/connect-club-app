import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Map, Room } from './components';

const App = () => {
  return (
    <View style={styles.container}>
      <Room />
      <Map />
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
