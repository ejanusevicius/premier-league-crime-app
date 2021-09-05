import { Crime } from './Crime';
import { StadiumLocation } from './StadiumLocation';

export interface ApplicationState {
    stadiumLocations: StadiumLocation[],
    selectedStadiumLocation: StadiumLocation | null,
    crimes: Crime[],
    selectedCrime: Crime | null
};