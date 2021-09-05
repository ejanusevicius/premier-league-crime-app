import { createContext } from "react";
import { ApplicationState } from "../interfaces/ApplicationState";

const initialApplicationState: ApplicationState = {
    stadiumLocations: [],
    selectedStadiumLocation: null,
    crimes: [],
    selectedCrime: null
}

export const ApplicationStateContext = createContext(initialApplicationState);