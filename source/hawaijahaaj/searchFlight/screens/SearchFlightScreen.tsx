// import * as React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Text } from '../../../components/Text';

// export function SearchFlightScreen() {
//   return (
//     <View style={styles.centered}>
//       <Text>Search Flight</Text>
//     </View>
//   );
// }

import React, { useState, useRef, FC } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSliceSelector, useThunkDispatch } from '../../../redux/hooks';
import { fetchFlightPlaces } from '../../../hw/flight/flightSlice';
import { FlightPlaces } from '../../../hw/flight/FlightModel';
import { Button } from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../../navigation/AppNav';
import { SearchStackProp } from '../searchStack/SearchStack';
import { AppHeader } from '../../component/AppHeader';
import {
  FlightSearchCard,
  FlightSearchCardProps,
} from '../../component/FlightSearchCard';
import { appColors } from '../../../styles/appColors';
import { Header } from '../../component/Header';
import { Segment, SegmentProps } from '../component/Segment';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { AppModel } from '../../component/AppModal';
import { FlightClassCard } from '../component/FlightClassCard';
import { FlightClass, Passenger, TripType } from '../flightSearchModel';

// type Timeout = ReturnType<typeof setTimeout>;

// type FieldType = 'from' | 'to';

export const SearchFlightScreen = () => {
  const [tripType, setTripType] = useState<TripType>('OneWay');
  const [passengers, setPassengers] = useState<Passenger>({
    adult: 1,
    children: 0,
    infant: 0,
  });
  const [flightClass, setFlightClass] = useState<FlightClass>('Economy');

  const navigation = useNavigation<SearchStackProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const places = useSliceSelector('flight').places ?? [];

  const onPressNext = () => {
    navigation.navigate('DepartureDate');
  };

  const onPressSearchCard: FlightSearchCardProps['onPress'] = sender => {};

  const onPressSegment: SegmentProps['onPress'] = sender => {
    setTripType(sender);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      {/* Cards */}
      <View style={styles.bgCard}>
        <Segment onPress={onPressSegment} />
        <FlightSearchCard onPress={onPressSearchCard} />
        <DateSelectionCard tripType={tripType} />
        <FlightType
          initialClass={flightClass}
          initialPassenger={passengers}
          getFlightClass={setFlightClass}
          getPassenger={setPassengers}
        />
      </View>

      <View style={{ margin: 24 }}>
        <Button
          disabled
          bgColor={appColors.defaultColor}
          title={'asdhakshdk'}
          onPress={onPressNext}
          // disabled={!from || !to} title={'Next'}
        />
      </View>
    </SafeAreaView>
  );
};

/** Show date selection */
const DateSelectionCard: FC<{ tripType: TripType }> = ({ tripType }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.innerCardLeft}>
        <Text style={styles.title}>Departure</Text>
        <Text style={styles.subTitle}>DD-mm-yyyy</Text>
      </TouchableOpacity>
      {tripType === 'RoundTrip' ? (
        <>
          <View style={styles.arrowBG}>
            <FontAwesome6
              name="arrow-right-long"
              size={24}
              color={appColors.white}
            />
          </View>

          <TouchableOpacity style={styles.innerCardRight}>
            <Text style={styles.title}>Return</Text>
            <Text style={styles.subTitle}>DD-mm-yyyy</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.innerCardRight} />
      )}
    </View>
  );
};

/** Show flight class and passenger  */
const FlightType: FC<{
  initialPassenger: Passenger;
  initialClass: FlightClass;
  getFlightClass: (sender: FlightClass) => void;
  getPassenger: (sender: Passenger) => void;
}> = ({
  initialPassenger,
  initialClass = 'Economy',
  getFlightClass,
  getPassenger,
}) => {
  const [passengers, setPassengers] = useState<Passenger>(initialPassenger);
  const [flightClass, setFlightClass] = useState<FlightClass>(initialClass);

  const [classModalVisible, setClassModalVisible] = useState<boolean>(false);

  const onPressClass = () => {
    setClassModalVisible(true);
  };

  const dismissModal = (sender?: FlightClass) => {
    setClassModalVisible(false);
    if (sender) {
      setFlightClass(sender);
      getFlightClass(sender);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.innerCardLeft}>
        <Text style={styles.title}>Passengers</Text>
        <Text style={styles.subTitle}>{`${
          initialPassenger.adult +
          initialPassenger.children +
          initialPassenger.infant
        }`}</Text>
      </TouchableOpacity>

      <View style={styles.lineBg}>
        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={onPressClass} style={styles.innerCardRight}>
        <Text style={styles.title}>Class</Text>
        <Text style={styles.subTitle}>{flightClass}</Text>
      </TouchableOpacity>
      <ShowModelFlightClass
        initialClass={initialClass}
        modalVisible={classModalVisible}
        dismissModal={dismissModal}
      />
    </View>
  );
};

const ShowModelPassenger: FC<{
  initialPassenger: Passenger;
  modalVisible: boolean;
  dismissModal: (sender?: FlightClass) => void;
}> = ({ modalVisible, dismissModal, initialPassenger }) => {
  const onPress = () => {
    dismissModal();
  };

  const onPressDone = (sender: FlightClass) => {
    dismissModal(sender);
  };

  return (
    <AppModel visible={modalVisible}>
      <TouchableOpacity onPress={onPress} style={stylesModal.safeArea} />
    </AppModel>
  );
};

const ShowModelFlightClass: FC<{
  initialClass: FlightClass;
  modalVisible: boolean;
  dismissModal: (sender?: FlightClass) => void;
}> = ({ modalVisible, dismissModal, initialClass }) => {
  const onPress = () => {
    dismissModal();
  };

  const onPressDone = (sender: FlightClass) => {
    dismissModal(sender);
  };

  return (
    <AppModel visible={modalVisible}>
      <TouchableOpacity onPress={onPress} style={stylesModal.safeArea} />
      <FlightClassCard onPressDone={onPressDone} initialClass={initialClass} />
    </AppModel>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.defaultDarkBlueColor,
  },
  arrowBG: {
    justifyContent: 'center',
  },
  lineBg: {
    width: 24,
    alignItems: 'center',
  },
  line: {
    flex: 1,
    width: 1,
    backgroundColor: appColors.white,
  },
  bgCard: {
    marginHorizontal: 24,
  },
  card: {
    marginTop: 16,
    backgroundColor: appColors.defaultColor,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: appColors.white,
    overflow: 'hidden',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  innerCardLeft: {
    flex: 1,
    paddingLeft: 24,
  },
  innerCardRight: {
    flex: 1,
    marginLeft: 24,
  },
  title: {
    fontSize: 12,
    color: '#C5D0D4',
  },
  subTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.white,
  },
});

const stylesModal = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
