import { FC, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { StyleSheet } from 'react-native';
import { appColors } from '../../../styles/appColors';
import { FlightClass, Passenger } from '../flightSearchModel';
import Ionicons from 'react-native-vector-icons/Ionicons';

// let FlightClassArray: Array<FlightClass> = [
//   'Economy',
//   'Premium Economy',
//   'Business',
//   'First class',
// ];

export const FlightPassengerCard: FC<{
  initialClass: Passenger;
  onPressDone: (sender: Passenger) => void;
}> = ({ initialClass, onPressDone }) => {
  const [selectedClass, setSelectedClass] = useState<Passenger>(initialClass);

  const onPress = (flightClass: Passenger) => {
    return () => {
      setSelectedClass(flightClass);
    };
  };

  const _onPressDone = () => {
    setSelectedClass(selectedClass);
    onPressDone(selectedClass);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.containerInner}>
          <Text style={styles.title}>Choose Class</Text>

          {FlightClassArray.map((item, index) => {
            const isSelected = selectedClass === item;
            return (
              <TouchableOpacity
                onPress={onPress(item)}
                style={styles.cell}
                key={`FlightClassCard${index}`}>
                <Text style={styles.text}>{item}</Text>
                <View style={styles.selectionContainer}>
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: isSelected
                          ? appColors.blue
                          : appColors.white,
                      },
                    ]}>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        color={appColors.white}
                        size={14}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button title={'Done'} onPress={_onPressDone} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    backgroundColor: appColors.defaultColor,
    paddingHorizontal: 8,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  containerInner: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    color: appColors.white,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: appColors.white,
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: appColors.white,
  },
});
