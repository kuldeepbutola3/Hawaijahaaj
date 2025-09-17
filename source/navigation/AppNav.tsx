import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import // createNativeStackNavigator,
//   createStackNavigator,
//   StackNavigationOptions,
'@react-navigation/native-stack';

// import { HomeScreen } from '../hw/home/screens/HomeScreen';
// import {
//   TreavellerScreen,
//   TreavellerScreenProps,
// } from '../hw/traveller/screens/TreavellerScreen';
// import {
//   FlightListScreen,
//   FlightListScreenProps,
// } from '../hw/flight/screens/FlightListScreen';
// import {
//   FlightFilterScreen,
//   FlightFilterScreenProps,
// } from '../hw/flight/screens/FlightFilterScreen';
// import {
//   ReviewFlightScreen,
//   ReviewFlightScreenProps,
// } from '../hw/flight/screens/ReviewFlightScreen';
// import { LoginScreenProps } from '../hw/login/screens/LoginScreen';
// import {
//   TravellerDetail,
//   TravellerDetailProps,
// } from '../hw/traveller/screens/TravellerDetailScreen';
// import {
//   AddTraveller,
//   AddTravellerProps,
// } from '../hw/traveller/screens/AddTraveller';
// import { SSRScreen, SSRScreenProps } from '../hw/SSR/screen/SSRScreen';
import {
  PayUScreenProps,
  PayUScreenScreen,
} from '../hw/payment/screens/PayUScreen';
import { LoginScreen } from '../hawaijahaaj/onBoarding/screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appColors } from '../styles/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { HomeScreen } from '../hawaijahaaj/home/screen/HomeScreen';
import { BookingScreen } from '../hawaijahaaj/booking/screen/BookingScreen';
import { WalletScreen } from '../hawaijahaaj/wallet/screen/WalletScreen';
import { ProfileScreen } from '../hawaijahaaj/profile/screen/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchFlightScreen } from '../hawaijahaaj/searchFlight/screens/SearchFlightScreen';
import { DepartureDateScreen } from '../hawaijahaaj/searchFlight/screens/DepartureDateScreen';
import { SearchStack } from '../hawaijahaaj/searchFlight/searchStack/SearchStack';
import {
  SearchLocation,
  SearchLocationProps,
} from '../hawaijahaaj/searchFlight/screens/SearchLocation';

export type AppRoutes = {
  HomeStack: undefined;
  SearchStack: undefined;
  SearchLocation: SearchLocationProps;
  // Booking: undefined;
  // Profile: undefined;
  // Wallet: undefined;
  // Traveller: TreavellerScreenProps;
  // //other screen
  // FlightSearch: FlightListScreenProps;
  // FlightFilter: FlightFilterScreenProps;
  // ReviewFlight: ReviewFlightScreenProps;
  // Login: LoginScreenProps;
  // TravelerDetail: TravellerDetailProps;
  // AddTraveller: AddTravellerProps;
  // SSR: SSRScreenProps;
  // Payment: PayUScreenProps;
};

export type AppNavigationProp = NavigationProp<AppRoutes>;

// const Stack = createNativeStackNavigator<AppRoutes>();
// export const AppNav = () => {
//   //   const childScreenOptions = {
//   //     headerBackTitleVisible: false,
//   //   };

//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         // options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Traveller"
//         component={TreavellerScreen}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="FlightSearch"
//         component={FlightListScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="FlightFilter"
//         component={FlightFilterScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ReviewFlight"
//         component={ReviewFlightScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="TravelerDetail"
//         component={TravellerDetail}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="AddTraveller"
//         component={AddTraveller}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SSR"
//         component={SSRScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Payment"
//         component={PayUScreenScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

const Stack = createNativeStackNavigator<AppRoutes>();
const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    // <SafeAreaView>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        // tabBarActiveTintColor: '#00aaff',
        tabBarActiveTintColor: appColors.blue,
        // tabBarInactiveTintColor: '#888',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: appColors.defaultColor,
          //   height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Booking') {
            return (
              <MaterialIcons name="book-online" size={size} color={color} />
            );
          } else if (route.name === 'Wallet') {
            return <FontAwesome5 name="wallet" size={size - 4} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    // </SafeAreaView>
  );
}

export function AppNav() {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: 'fullScreenModal', headerShown: false }}>
      <Stack.Screen name="HomeStack" component={TabScreen} />
      <Stack.Screen name="SearchStack" component={SearchStack} />
      <Stack.Screen name="SearchLocation" component={SearchLocation} />
    </Stack.Navigator>
  );
}

export type AppRouteProp<Route extends keyof AppRoutes> = RouteProp<
  AppRoutes,
  Route
>;
