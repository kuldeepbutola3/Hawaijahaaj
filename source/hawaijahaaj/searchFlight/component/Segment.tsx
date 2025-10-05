import { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appColors } from '../../../styles/appColors';
import { TripType } from '../flightSearchModel';

export interface SegmentProps {
  onPress: (sender: TripType) => void;
  initialSelection?: TripType;
}

export const Segment: FC<SegmentProps> = ({
  onPress,
  initialSelection = 'OneWay',
}) => {
  const [selectedTab, setSelectedTab] = useState<TripType>(initialSelection);

  let selectedColor = appColors.defaultColor;
  let selectedText = appColors.white;
  let unSelectedColor = appColors.white;
  let unSelectedText = appColors.black;

  let tab1Color =
    selectedTab === 'OneWay'
      ? [selectedColor, selectedText]
      : [unSelectedColor, unSelectedText];
  let tab2Color =
    selectedTab === 'RoundTrip'
      ? [selectedColor, selectedText]
      : [unSelectedColor, unSelectedText];

  const onPress1 = () => {
    setSelectedTab('OneWay');
    onPress('OneWay');
  };

  const onPress2 = () => {
    setSelectedTab('RoundTrip');
    onPress('RoundTrip');
  };

  return (
    <View style={styles.container}>
      {/* 1st tab */}
      <TouchableOpacity
        onPress={onPress1}
        style={[styles.tab, { backgroundColor: tab1Color[0] }]}>
        <Text style={[styles.text, { color: tab1Color[1] }]}>One Way</Text>
      </TouchableOpacity>
      {/* 2nd tab */}
      <TouchableOpacity
        onPress={onPress2}
        style={[styles.tab, { backgroundColor: tab2Color[0] }]}>
        <Text style={[styles.text, { color: tab2Color[1] }]}>Round Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 38,
    borderWidth: 1,
    borderColor: appColors.white,
    borderRadius: 38 / 2,
    marginHorizontal: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 16 },
});
