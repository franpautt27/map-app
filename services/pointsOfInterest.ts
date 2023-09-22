
import { POIsParamsType } from "../interfaces/POIsParamsType";
import { FetchedPointsOfInterest } from "../interfaces/PointsOfInterest";
import api from "./api";

export async function fetchPointsOfInterest({
  latitude,
  latitudeDelta,
  longitude,
  longitudeDelta
}: POIsParamsType ) {
  const pointsOfInterest = await api.get<FetchedPointsOfInterest>("/get-place-nearby.php", {
    params: { 
        latitude,
        longitude,
        longitudeDelta,
        latitudeDelta
     },
  });
  return pointsOfInterest.data.list;
}