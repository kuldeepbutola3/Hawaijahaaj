import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { appColors } from '../../../styles/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '../../../components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../../navigation/AppNav';
// import { TextInput } from '../../../components/TextInput';

const { width } = Dimensions.get('window');

const trendingDestinations = [
  {
    id: '1',
    name: 'Delhi',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/India_Gate_in_New_Delhi_03-2016_img3.jpg/320px-India_Gate_in_New_Delhi_03-2016_img3.jpg',
  },
  {
    id: '2',
    name: 'Mumbai',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mumbai_central_munrotala_1880s.jpg/320px-Mumbai_central_munrotala_1880s.jpg',
  },
];

export function HomeScreen() {
  const navigation = useNavigation<AppNavigationProp>();

  const navigateToSearch = () => {
    navigation.navigate('SearchStack');
    navigation.navigate('SearchLocation', { fieldType: 'from' });
    // navigation.navigate('SearchStack');
  };
  const onPressSource = () => {
    navigateToSearch();
  };

  const onPressDestination = () => {
    navigateToSearch();
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userIconWrapper}>
          <Ionicons name="person-circle-outline" size={35} color="#555" />
        </View>
        <Text style={styles.greetingText}>Hi, User</Text>
      </View>

      {/* Airplane image with cloud background */}
      <View style={styles.airplaneContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/69/69524.png',
          }}
          style={styles.airplaneImage}
          resizeMode="contain"
        />
        <View style={styles.cloudsBackground}>
          <Text style={styles.cloudText}>Clouds</Text>
        </View>
      </View>

      {/* Location Input Card */}
      <View style={styles.locationCard}>
        <View style={styles.inputRow}>
          <MaterialIcons name="flight-takeoff" size={20} color="#fff" />
          <TextInput
            placeholder="Origin"
            placeholderTextColor="#cdf6ff"
            style={styles.input}
            readOnly
            onPress={onPressSource}
          />
        </View>
        <View style={[styles.inputRow, { marginTop: 10 }]}>
          <MaterialIcons name="flight-land" size={20} color="#fff" />
          <TextInput
            placeholder="Destination"
            placeholderTextColor="#cdf6ff"
            style={styles.input}
            readOnly
            onPress={onPressDestination}
          />
          <TouchableOpacity style={styles.swapButton}>
            <MaterialIcons name="swap-vert" size={24} color="#00d2ff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Trending Destinations */}
      <View style={styles.trendingHeader}>
        <Text style={styles.trendingTitle}>Trending destinations</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingDestinations}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingLeft: 20 }}
        style={{ marginBottom: 70 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.destinationCard}>
            <Image source={{ uri: item.image }} style={styles.destinationImg} />
            <View style={styles.destinationNameWrapper}>
              <Text style={styles.destinationName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8f0ff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  userIconWrapper: {
    marginRight: 8,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  airplaneContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#00acee',
    borderRadius: 12,
    marginHorizontal: 12,
    overflow: 'hidden',
    shadowColor: '#00acee',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  airplaneImage: {
    width: '85%',
    height: 120,
    tintColor: 'white',
  },
  cloudsBackground: {
    position: 'absolute',
    top: 30,
    left: 20,
    opacity: 0.12,
  },
  cloudText: {
    fontSize: 60,
    fontWeight: '900',
    color: 'white',
  },
  locationCard: {
    backgroundColor: '#0096db',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#007bb8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    color: '#cdf6ff',
    fontWeight: '600',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#33b8ff',
  },
  swapButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 15,
  },
  trendingHeader: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#002f4b',
  },
  seeAll: {
    color: '#00acee',
    fontWeight: '600',
    fontSize: 16,
  },
  destinationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: width * 0.6,
    marginRight: 20,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 5,
  },
  destinationImg: {
    height: 140,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  destinationNameWrapper: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
