import { Crime } from "../interfaces/Crime";
import { Location } from "../interfaces/Location";

const actions = {
    SET_LOCATIONS: "SET_LOCATIONS",
    SELECT_LOCATION: "SELECT_LOCATION",
    SET_CRIMES: "SET_CRIMES",
    SELECT_CRIME: "SELECT_CRIME"
};

export function setLocations(payload: Location[]) {
    return {
        type: actions.SET_LOCATIONS,
        payload
    }
}

export function selectLocation(payload: Location) {
    return {
        type: actions.SELECT_LOCATION,
        payload
    }
}

export function setCrimes(payload: Crime[]) {
    return {
        type: actions.SET_CRIMES,
        payload
    }
}

export function selectCrime(payload: Crime) {
    return {
        type: actions.SELECT_CRIME,
        payload
    }
}

export default actions;