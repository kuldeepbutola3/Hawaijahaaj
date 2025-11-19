export type TripType = 'OneWay' | 'RoundTrip';

export type FlightClass =
  | 'Economy'
  | 'Premium Economy'
  | 'Business'
  | 'First class';

export interface Passenger {
  adult: number;
  children: number;
  infant: number;
}
