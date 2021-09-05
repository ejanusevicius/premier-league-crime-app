import { Crime } from './Crime';
import { Location } from './Location';

export interface ApplicationState {
    stadiumLocations: Location[],
    selectedStadiumLocation: Location | null,
    crimes: Crime[],
    selectedCrime: Crime | null
};