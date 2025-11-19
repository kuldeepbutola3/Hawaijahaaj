import { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { appColors } from '../../styles/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const Header: FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity onPress={onPress} style={styles.back}>
        <Ionicons name="arrow-back" size={26} color={appColors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    marginLeft: 12,
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
