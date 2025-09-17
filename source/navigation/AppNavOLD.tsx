import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  //   createStackNavigator,
  //   StackNavigationOptions,
} from '@react-navigation/native-stack';

import { HomeScreen } from '../hw/home/screens/HomeScreen';
import {
  TreavellerScreen,
  TreavellerScreenProps,
} from '../hw/traveller/screens/TreavellerScreen';
import {
  FlightListScreen,
  FlightListScreenProps,
} from '../hw/flight/screens/FlightListScreen';
import {
  FlightFilterScreen,
  FlightFilterScreenProps,
} from '../hw/flight/screens/FlightFilterScreen';
import {
  ReviewFlightScreen,
  ReviewFlightScreenProps,
} from '../hw/flight/screens/ReviewFlightScreen';
import { LoginScreenProps } from '../hw/login/screens/LoginScreen';
import {
  TravellerDetail,
  TravellerDetailProps,
} from '../hw/traveller/screens/TravellerDetailScreen';
import {
  AddTraveller,
  AddTravellerProps,
} from '../hw/traveller/screens/AddTraveller';
import { SSRScreen, SSRScreenProps } from '../hw/SSR/screen/SSRScreen';
import {
  PayUScreenProps,
  PayUScreenScreen,
} from '../hw/payment/screens/PayUScreen';
import { LoginScreen } from '../hawaijahaaj/onBoarding/screens/LoginScreen';

export type AppRoutes = {
  Home: undefined;
  Traveller: TreavellerScreenProps;
  //other screen
  FlightSearch: FlightListScreenProps;
  FlightFilter: FlightFilterScreenProps;
  ReviewFlight: ReviewFlightScreenProps;
  Login: LoginScreenProps;
  TravelerDetail: TravellerDetailProps;
  AddTraveller: AddTravellerProps;
  SSR: SSRScreenProps;
  Payment: PayUScreenProps;
};

export type ApptNavigationProp = NavigationProp<AppRoutes>;

const Stack = createNativeStackNavigator<AppRoutes>();
export const AppNav = () => {
  //   const childScreenOptions = {
  //     headerBackTitleVisible: false,
  //   };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Traveller"
        component={TreavellerScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FlightSearch"
        component={FlightListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlightFilter"
        component={FlightFilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewFlight"
        component={ReviewFlightScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TravelerDetail"
        component={TravellerDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTraveller"
        component={AddTraveller}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SSR"
        component={SSRScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={PayUScreenScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export type AppRouteProp<Route extends keyof AppRoutes> = RouteProp<
  AppRoutes,
  Route
>;
