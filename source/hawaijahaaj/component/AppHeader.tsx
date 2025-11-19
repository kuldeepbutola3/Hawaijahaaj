import { FC } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { appColors } from '../../styles/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const AppHeader: FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.userIconWrapper}>
        <Ionicons
          name="person"
          size={18}
          color={appColors.defaultDarkBlueColor}
        />
      </View>
      <Text style={styles.greetingText}>Hi, User</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  userIconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
