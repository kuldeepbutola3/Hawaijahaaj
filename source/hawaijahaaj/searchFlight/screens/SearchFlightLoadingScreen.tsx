import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { appColors } from '../../../styles/appColors';
import { useThunkDispatch } from '../../../redux/hooks';
import { fetchFlight } from '../../../hw/flight/flightSlice';
import { useNavigation } from '@react-navigation/native';
import { SearchStackProp } from '../searchStack/SearchStack';
import { GetFlightParam } from '../../../hw/flight/FlightSearchRequestModel';

export const SearchFlightLoadingScreen = () => {
  const dispatch = useThunkDispatch();
  const navigation = useNavigation<SearchStackProp>();

  useEffect(() => {
    // dispatch(doFetchRefreshToken()).then(_ => {
    var date = new Date();
    date.setDate(date.getDate() + 30);

    var date2 = new Date();
    date2.setDate(date2.getDate() + 35);
    let param: GetFlightParam = {
      adultCount: 1,
      childCount: 0,
      class: 'Economy',
      infantCount: 0,
      journeyDate: date,
      segments: [
        {
          DepDate: date,
          destination: 'CCU',
          origin: 'DEL',
          flightCabinClass: 'Economy',
          preferredDepartureTime: date,
        },
        {
          DepDate: date2,
          destination: 'DEL',
          origin: 'CCU',
          flightCabinClass: 'Economy',
          preferredDepartureTime: date2,
        },
      ],
    };
    dispatch(fetchFlight(param))
      .then(() => {
        navigation.navigate('FlightList', { param });
      })
      .catch(() => {
        navigation.goBack();
      });
    // });
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.defaultColor,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#6200ee" />
    </View>
  );
};
