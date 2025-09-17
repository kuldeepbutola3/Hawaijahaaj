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

import React, { useState, useRef } from 'react';
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

export const SearchFlightScreen = () => {
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  // const [searchResults, setSearchResults] = useState(AIRPORTS);
  const [activeField, setActiveField] = useState<FieldType | null>('from'); // 'from' or 'to'

  const dispatch = useThunkDispatch();
  const searchApiReq = useRef<Timeout>(null);
  const navigation = useNavigation<SearchStackProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const places = useSliceSelector('flight').places ?? [];

  const onPressSearchLocation = () => {
    appNavigation.navigate('');
  };

  const onPressNext = () => {
    navigation.navigate('DepartureDate');
  };
  //search
  const _setSearchInput = (text: string) => {
    setLoading(true);
    setSearchInput(text);
    if (searchApiReq.current) {
      clearTimeout(searchApiReq.current);
      searchApiReq.current = null;
    }
    searchApiReq.current = setTimeout(() => {
      dispatch(fetchFlightPlaces({ term: text })).finally(() => {
        setLoading(false);
      });
    }, 500);
  };

  // Open modal to pick location, set active field
  const openModal = (field: FieldType) => {
    setActiveField(field);
    setSearchInput('');
    setModalVisible(true);
  };

  // Select airport from search
  const selectAirport = (airport: FlightPlaces) => {
    if (activeField === 'from') {
      setFrom(`${airport.cityName} (${airport.cityCode})`);
    } else if (activeField === 'to') {
      setTo(`${airport.cityName} (${airport.cityCode})`);
    }
    setModalVisible(false);
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

      <View style={{ margin: 24 }}>
        <Button
          onPress={onPressNext}
          // disabled={!from || !to} title={'Next'}
        />
      </View>
      {/* Trending destinations */}
      {/* <View style={styles.trendingHeader}>
        <Text style={styles.trendingTitle}>Trending destinations</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        horizontal
        data={TRENDING}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingLeft: 20 }}
        style={{ flexGrow: 0 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.destinationCard}>
            <Image source={{ uri: item.image }} style={styles.destinationImg} />
            <Text style={styles.destinationCity}>{item.city}</Text>
          </View>
        )}
      /> */}

      {/* Search & dropdown modal */}
      {/* <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ paddingRight: 10 }}>
              <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>
            <TextInput
              autoFocus={true}
              placeholder="Search city, airport code..."
              style={styles.searchInput}
              value={searchInput}
              onChangeText={_setSearchInput}
              clearButtonMode="while-editing"
            />
            {searchInput.length > 0 && (
              <TouchableOpacity onPress={() => setSearchInput('')}>
                <Ionicons name="close-circle" size={24} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={places}
            // keyExtractor={item => item.cityCode}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={`${index}-${item.countryCode}`}
                style={styles.searchResultItem}
                onPress={() => selectAirport(item)}>
                <Text style={styles.airportCode}>
                  ({item.cityCode}) {item.cityName}
                </Text>
                <Text style={styles.airportName}>{item.cityName}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#999"
                  style={{ alignSelf: 'center' }}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyList}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{ color: '#999' }}>No results found</Text>
                )}
              </View>
            }
          />
        </SafeAreaView>
      </Modal> */}
    </SafeAreaView>
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
