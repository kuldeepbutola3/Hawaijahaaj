import { formatDate } from '../../utils/date-formatter';
import { getClient, getGlobalClient } from '../HWClient';
import {
  FlightFareResponse,
  FlightPlaces,
  FlightResponse,
} from './FlightModel';
import {
  FlightSearchRequest,
  GetFlightParam,
} from './FlightSearchRequestModel';
import { getFlightClassTypeValue } from './flightSearchViewModel';

const FLIGHT_SEARCH = 'v1/service/search/flights';
const FLIGHT_PLACES = 'v1/service/search/get_itemName_list';
const FLIGHT_FARE = 'v1/service/search/fareQuote';

export type FlightEndpoint = typeof FLIGHT_SEARCH | typeof FLIGHT_PLACES;
export const getSessionClient = () => getClient();

export interface PlacesParam {
  term: string;
}

export interface FlightFareParam {
  resultSessionId: Array<string>;
}

export async function getFlight(
  params: GetFlightParam,
): Promise<FlightResponse> {
  const segments: FlightSearchRequest['segments'] = params.segments.map(obj => {
    return {
      origin: obj.origin, // "CCU",
      destination: obj.destination,
      flightCabinClass: getFlightClassTypeValue(obj.flightCabinClass), //"2",
      DepDate: formatDate(obj.DepDate, 'YYYY-MM-DD'), //"2025-11-10",
      preferredDepartureTime:
        formatDate(obj.preferredDepartureTime, 'YYYY-MM-DD') + 'T00:00:00',
    };
  });

  const param: FlightSearchRequest = {
    segments,
    journeyType: segments.length,
    adultCount: params.adultCount,
    childCount: params.childCount,
    infantCount: params.infantCount,
    onwarddate: formatDate(params.journeyDate, 'YYYY-MM-DD'),
    onwardJDate: formatDate(params.journeyDate, 'YYYY-MM-DD'),
    //Thing we dont know
    domIntFlag: 'D',
    // agency2: 'testb2c.gapiinfotech.com',
    agency: 'testv2.gapiinfotech.com',
    resultCategory: 1,
  };

  console.log('hit flight data :::', getSessionClient().defaults);
  console.log('hit flight data:::', param);
  const { data } = await getSessionClient().post<FlightResponse>(
    FLIGHT_SEARCH,
    param,
  );
  console.log('flight data :::', data);
  return data;
}

export async function searchPlaces(
  param: PlacesParam,
): Promise<Array<FlightPlaces>> {
  console.log('hit searchPlaces:::', getSessionClient().defaults.headers);
  const { data } = await getGlobalClient().get<Array<FlightPlaces>>(
    `${FLIGHT_PLACES}?term=${param.term}`,
  );
  console.log('result ::', data);
  return data;
}

export async function getFlightFare(
  param: FlightFareParam,
): Promise<FlightFareResponse> {
  console.log('hit getFareID:::', getSessionClient().defaults.headers);

  const { data } = await getClient().post<FlightFareResponse>(
    FLIGHT_FARE,
    param,
  );
  return data;
}
