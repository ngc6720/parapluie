export interface DataView {
  idle: Boolean;
  pending: Boolean;
  error: Boolean;
  data: Boolean;
}
export interface AutocompleteResult {
  id: string;
  name: string;
}
export interface GeoData {
  name: Array<string>;
  coordinates: [number, number];
}
export interface WeatherData {
  name: Array<string>;
  date: string;
  time: Array<string>;
  values: Array<number>;
  timezone: string;
  unit: string;
  coordinates: [number, number];
}
