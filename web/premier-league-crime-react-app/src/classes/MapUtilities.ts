import { CoordinateSet } from "../interfaces/CoordinateSet";

export class MapUtilities {
    static createCoordinateArray(latitude: number, longitude: number): CoordinateSet {
        return [ parseFloat(latitude as never as string), parseFloat(longitude as never as string) ];
    }
}