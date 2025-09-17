import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../../components/Text';

export function BookingScreen() {
  return (
    <View style={styles.centered}>
      <Text>Booking Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
