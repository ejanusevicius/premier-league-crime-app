import { CoordinateSet } from "../interfaces/CoordinateSet";
import { MapConstants } from "./MapConstants";

export class MapUtilities {
    static createCoordinateArray(latitude: number, longitude: number): CoordinateSet {
        return [ parseFloat(latitude as never as string), parseFloat(longitude as never as string) ];
    }
    static getFocusedStadiumZoom(currentZoomValue?: number) {
        if (currentZoomValue === MapConstants.MAP_ZOOM_FOR_STADIUM) {
            return MapConstants.MAP_ZOOM_FOR_STADIUM - 1; // Decrement 1 so the zoom value triggers a re-render of the map.
        } else {
            return MapConstants.MAP_ZOOM_FOR_STADIUM;
        }
    }
}