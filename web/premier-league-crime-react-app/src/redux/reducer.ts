import { initialState } from "./initialState";
import { ReduxAction } from "./interfaces";
import actions from './actions';
import { ApplicationState } from "../interfaces/ApplicationState";

function reducer(state = initialState, action: ReduxAction) {
    const { type, payload } = action;
    switch(type) {
        case actions.SET_CRIMES: return updateState(state, { crimes: payload });
        case actions.SELECT_CRIME: return updateState(state, { selectedCrime: payload });
        case actions.SELECT_LOCATION: return updateState(state, { selectedLocation: payload });
        case actions.SET_LOCATIONS: return updateState(state, { stadiumLocations: payload });
        default: return initialState;
    }
};

function updateState(state: ApplicationState, updatedState: any) {
    const newState = {
        ...state,
        ...updatedState
    }
    return newState;
};

export default reducer;