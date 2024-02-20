import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LeagueScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>League Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF4D7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});