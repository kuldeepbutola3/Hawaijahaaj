import { NavigationProp, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchFlightScreen } from '../screens/SearchFlightScreen';
import { DepartureDateScreen } from '../screens/DepartureDateScreen';
import { SearchFlightLoadingScreen } from '../screens/SearchFlightLoadingScreen';
import {
  FlightListScreen,
  FlightListScreenProps,
} from '../screens/FlightListScreen';

type SearchRoutes = {
  SearchFlight: undefined;
  DepartureDate: undefined;
  SearchFlightLoading: undefined;
  FlightList: FlightListScreenProps;
};

const Stack = createNativeStackNavigator<SearchRoutes>();

export type SearchStackProp = NavigationProp<SearchRoutes>;

export function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchFlight" component={SearchFlightScreen} />
      <Stack.Screen name="DepartureDate" component={DepartureDateScreen} />
      <Stack.Screen
        name="SearchFlightLoading"
        component={SearchFlightLoadingScreen}
      />
      <Stack.Screen name="FlightList" component={FlightListScreen} />
    </Stack.Navigator>
  );
}

export type SearchRouteProp<Route extends keyof SearchRoutes> = RouteProp<
  SearchRoutes,
  Route
>;
