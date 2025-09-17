import { ClassType } from '../../constants/enums';

interface Segment {
  origin: String; //"DEL",
  destination: String; // "CCU",
  flightCabinClass: String; //"2",
  DepDate: String; //"2025-11-10",
  preferredDepartureTime: String; // "2025-11-10T00:00:00"
}

export interface FlightSearchRequest {
  adultCount: number;
  childCount: number;
  infantCount: number;
  // journeyType: number;
  //   prefclass: number; //"2",
  onwarddate: String; //"2025-11-10",
  onwardJDate: String; //"2025-11-10",
  domIntFlag: String; //"D",
  segments: Array<Segment>;
  // agency2: String; //"testb2c.gapiinfotech.com",
  agency: String; //"testv2.gapiinfotech.com",
  resultCategory: number; //1
  journeyType: number;
}

export interface GetFlightParam {
  segments: Array<{
    origin: String; // "CCU",
    destination: String;
    flightCabinClass: ClassType; //"2",
    DepDate: Date; //"2025-11-10",
    preferredDepartureTime: Date;
  }>;
  adultCount: number;
  childCount: number;
  infantCount: number;
  class: ClassType;

  // originName: string;
  // destinationName: string;
  // originCode: string;
  // destinationCode: string;
  // journeyType: TripType;

  journeyDate: Date;
  // journeyDate: Date;
}
