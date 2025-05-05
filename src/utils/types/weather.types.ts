import { IUser } from "./user.types";

export type WeatherCondition = {
  __typename?: "WeatherCondition";
  description?: string | null;
  icon?: string | null;
  id?: number | null;
  main?: string | null;
};

export type WeatherCoords = {
  __typename?: "WeatherCoords";
  lat?: number | null;
  lng?: number | null;
};

export type Wind = {
  __typename?: "Wind";
  deg?: number | null;
  gust?: number | null;
  speed?: number | null;
};

export type IWeather = {
  __typename?: "Weather";
  clouds?: Record<string, any> | null;
  conditions?: Array<WeatherCondition | null> | null;
  coords?: WeatherCoords | null;
  createdAt?: string | null;
  createdBy?: IUser | null;
  humidity?: number | null;
  id?: string | null;
  name?: string | null;
  pressure?: number | null;
  temperature?: number | null;
  temperatureFeelsLike?: number | null;
  temperatureMax?: number | null;
  temperatureMin?: number | null;
  updatedAt?: string | null;
  updatedBy?: IUser | null;
  visibility?: number | null;
  wind?: Wind | null;
};
