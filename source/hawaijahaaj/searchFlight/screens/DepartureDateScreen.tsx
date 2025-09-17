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

import React, { useState, useEffect, useRef } from 'react';
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
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { SearchStackProp } from '../searchStack/SearchStack';

const { width } = Dimensions.get('window');
// Sample airport data for search:
// type Places = {
//    code: string; city: string; name: string
// }
// type PlacesViewModels = Array<Places>;
// const AIRPORTS = [
//   { code: 'ADL', city: 'Adelaide', name: 'Adelaide Airport' },
//   { code: 'BOC', city: 'Bocas Del Toro', name: 'Bocas Del Toro Airport' },
//   { code: 'DDN', city: 'Delta Downs', name: 'Delta Downs Airport' },
//   { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International Airport' },
//   { code: 'DJN', city: 'Delta Junction', name: 'Delta Junction Airport' },
//   {
//     code: 'BOM',
//     city: 'Mumbai',
//     name: 'Chhatrapati Shivaji International Airport',
//   },
// ];

// Trending destinations with images
// const TRENDING = [
//   {
//     id: '1',
//     city: 'Delhi',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/c/cd/India_Gate_in_New_Delhi_03-2016_img3.jpg',
//   },
//   {
//     id: '2',
//     city: 'Mumbai',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/a/a6/Mumbai_Skyline_2014.jpg',
//   },
// ];
type Timeout = ReturnType<typeof setTimeout>;

// const viewModel: PlacesViewModels = (places : ) => {
// return
// }
type FieldType = 'from' | 'to';

export const DepartureDateScreen = () => {
  const [selected, setSelected] = useState<DateData>();
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  //   const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  // const [searchResults, setSearchResults] = useState(AIRPORTS);
  const [activeField, setActiveField] = useState<FieldType | null>(null); // 'from' or 'to'

  const dispatch = useThunkDispatch();
  const searchApiReq = useRef<Timeout>(null);
  const navigation = useNavigation<SearchStackProp>();

  //   const places = useSliceSelector('flight').places ?? [];

  const onPressNext = () => {
    // navigation.navigate;
  };

  const _setSelected = (date: DateData) => {
    setSelected(date);
    // setModalVisibleDate(false);
  };
  const onPressDepartureDate = () => {
    setModalVisibleDate(true);
    // navigation.goBack()
  };
  //search

  // Open modal to pick location, set active field
  const openModal = (field: FieldType) => {
    // setActiveField(field);
    // setSearchInput('');
    navigation.goBack();
    // setModalVisibleDate(true);
  };

  // Select airport from search
  const selectAirport = (airport: FlightPlaces) => {
    if (activeField === 'from') {
      setFrom(`${airport.cityName} (${airport.cityCode})`);
    } else if (activeField === 'to') {
      setTo(`${airport.cityName} (${airport.cityCode})`);
    }
    // setModalVisible(false);
  };

  const onPressSearchFlight = () => {
    navigation.navigate('SearchFlightLoading');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="#555" />
        <Text style={styles.greeting}>Hi, User</Text>
      </View>

      {/* Airplane background */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60',
        }}
        style={styles.airplaneBackground}
        imageStyle={{ opacity: 0.7 }}>
        <View style={styles.inputsCard}>
          <TouchableOpacity
            style={styles.inputBox}
            activeOpacity={0.7}
            onPress={() => openModal('from')}>
            <Ionicons name="airplane-outline" size={20} color="#ddd" />
            <Text style={from ? styles.inputText : styles.inputPlaceholder}>
              {from || 'Origin'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputBox}
            activeOpacity={0.7}
            onPress={() => openModal('to')}>
            <Ionicons name="flag-outline" size={20} color="#ddd" />
            <Text style={to ? styles.inputText : styles.inputPlaceholder}>
              {to || 'Destination'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* <View style={{ margin: 24 }}>
        <Button onPress={onPressNext} disabled={!from || !to} title={'Next'} />
      </View> */}
      <View style={{ margin: 24, flexDirection: 'row' }}>
        <Button onPress={onPressDepartureDate} title={'Destination'} />
        <Button onPress={onPressDepartureDate} title={'Return'} />
      </View>

      <View style={{ margin: 24 }}>
        <Button onPress={onPressDepartureDate} title={'Passanger'} />
      </View>

      <Button
        onPress={onPressSearchFlight}
        title={'Search Flight'}
        style={{ marginHorizontal: 24 }}
      />
      <CalenderView
        setModalVisible={setModalVisibleDate}
        modalVisible={modalVisibleDate}
        selected={selected?.dateString ?? ''}
        setSelected={_setSelected}
      />
    </SafeAreaView>
  );
};

const CalenderView: React.FC<{
  modalVisible: boolean;
  setModalVisible: (hide: boolean) => void;
  selected: string;
  setSelected: (date: DateData) => void;
}> = ({ modalVisible, selected, setSelected, setModalVisible }) => {
  const onPress = () => {
    setModalVisible(false);
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <SafeAreaView
        style={{
          flexDirection: 'column-reverse',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {/* <Text>askndakdn ksaldklasdlsak ndad nalskn</Text> */}
        <Calendar
          enableSwipeMonths
          onDayPress={setSelected}
          style={{
            marginHorizontal: 10,
            borderRadius: 24,
            marginBottom: 20,
            overflow: 'hidden',
            // backgroundColor: 'blue',
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              //   customStyles: { container: { backgroundColor: 'red' } },
              //   selectedDotColor: 'orange',
            },
          }}
          theme={
            {
              // backgroundColor: 'green',
              // contentStyle: {backgroundColor : 'green'}
              // calendarBackground: '#b02a2aff',
              // textSectionTitleColor: '#052e5aff',
              // selectedDayBackgroundColor: '#00adf5',
              // selectedDayTextColor: '#ffffff',
              // todayTextColor: '#00adf5',
              // dayTextColor: '#2d4150',
              // textDisabledColor: '#dd99ee',
            }
          }
        />
        <Button
          onPress={onPress}
          title={'Done'}
          style={{ marginHorizontal: 24 }}
        />
        {/* <TouchableOpacity onPress={onPress} style={{ flex: 1 }} /> */}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f0ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '600',
    color: '#333',
  },
  airplaneBackground: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputsCard: {
    backgroundColor: '#189bfe',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 18,
    opacity: 0.95,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34a3ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
  },
  inputPlaceholder: {
    color: '#c9e6ff',
    fontSize: 16,
    marginLeft: 12,
  },
  inputText: {
    color: '#fff',
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 16,
  },
  trendingHeader: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  seeAll: {
    color: '#0a84ff',
    fontSize: 15,
    fontWeight: '600',
  },
  destinationCard: {
    marginRight: 15,
    borderRadius: 12,
    width: width * 0.5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  destinationImg: {
    height: 140,
    width: '100%',
  },
  destinationCity: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontWeight: '700',
    fontSize: 15,
    color: '#333',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginLeft: 6,
    marginRight: 6,
  },
  searchResultItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airportCode: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111',
  },
  airportName: {
    fontSize: 14,
    color: '#777',
    flex: 1,
    marginLeft: 12,
  },
  emptyList: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
