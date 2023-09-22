
import { POIsParamsType } from "../interfaces/POIsParamsType";
import { FetchedPointsOfInterest } from "../interfaces/PointsOfInterest";
import api from "./api";

export async function fetchTickers({
  latitude,
  latitudeDelta,
  longitude,
  longitudeDelta
}: POIsParamsType ) {
  const fetchedTickers = await api.get<FetchedPointsOfInterest>("/get-place-nearby.php", {
    params: { 
        latitude,
        longitude,
        longitudeDelta,
        latitudeDelta
     },
  });
  return fetchedTickers.data.list;
}