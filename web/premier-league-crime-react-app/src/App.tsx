import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { selectCrime, selectLocation, setCrimes, setLocations } from './redux/actions';
import { FiEye } from 'react-icons/fi';

import { ApiEndpoints } from './classes/ApiEndpoints';
import { StadiumLocation } from './interfaces/StadiumLocation';
import { Crime } from './interfaces/Crime';
import { ApplicationState } from './interfaces/ApplicationState';

import LocationCard from './components/LocationCard';
import Map from './components/Map';
import PremierLeagueLogoSvg from './components/PremierLeagueLogoSvg';
import CrimeCard from './components/CrimeCard';
import LoadingBoundary from './components/LoadingBoundary';
import Placeholder from './components/Placeholder';
import CrimeInsight from './components/CrimeInsight';

import { useHttp } from './hooks/useHttp';
import './App.css';

const mapStateToProps = (state: ApplicationState) => {
  return {
    stadiumLocations: state.stadiumLocations,
    crimes: state.crimes,
    selectedStadiumLocation: state.selectedStadiumLocation,
    selectedCrime: state.selectedCrime
  }
}
const mapDispatchToProps = {
  setStadiumLocations: (locations: StadiumLocation[]) => setLocations(locations),
  setCrimes: (crimes: Crime[]) => setCrimes(crimes),
  selectCrime: (crime: Crime | null) => selectCrime(crime),
  selectLocation: (location: StadiumLocation | null) => selectLocation(location)
}
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropTypes = ConnectedProps<typeof connector>;

function App({
  setStadiumLocations,
  stadiumLocations,
  setCrimes,
  crimes,
  selectCrime,
  selectLocation,
  selectedStadiumLocation,
  selectedCrime
}: PropTypes) {
  
  const { 
    get: getRequestForStadiumLocations, 
    loading: stadiumLocationsAreLoading, 
    setLoading: setStadiumLocationsAreLoading
  } = useHttp({ defaultLoadingState: true });

  const { 
    get: getRequestForCrimes, 
    loading: crimesForStadiumAreLoading, 
    setLoading: setCrimesForStadiumAreLoading
  } = useHttp();

  useEffect(() => {
    loadStadiumLocations();
  }, []);

  async function loadStadiumLocations() {
    setStadiumLocationsAreLoading(true);
    const stadiumLocations = await getRequestForStadiumLocations(ApiEndpoints.geStadiumLocations);
    setStadiumLocations(stadiumLocations);
    setStadiumLocationsAreLoading(false);
  }

  async function selectStadiumLocationAndGetCrimes(location: StadiumLocation) {
    if (differentLocationIsClicked(location) && locationCrimesAreNotCurrentlyLoading()) {
      setCrimesForStadiumAreLoading(true);
      resetCurrentSelectedLocationAndCrime();

      const { latitude, longitude } = location;
      const { crimes } = await getRequestForCrimes(ApiEndpoints.getCrimesForStadiumCoorindates(latitude, longitude));

      setCrimes(crimes);
      selectLocation(location);
      setCrimesForStadiumAreLoading(false);

    }
  }

  async function resetCurrentSelectedLocationAndCrime() {
    selectLocation(null);
    selectCrime(null);
  }

  function locationCrimesAreNotCurrentlyLoading() {
    return crimesForStadiumAreLoading === false;
  }

  function differentLocationIsClicked(currentStadium: StadiumLocation) {
    return currentStadium?.id !== selectedStadiumLocation?.id;
  }
  
  function crimesExist() {
    return crimeCards?.length > 0;
  }

  const locationCards = stadiumLocations.map(location => <LocationCard location={location} onClick={() => selectStadiumLocationAndGetCrimes(location)}/>)
  const crimeCards = crimes.map(crime => <CrimeCard crime={crime} onClick={() => selectCrime(crime)} />)

  return (
    <main className="w-full h-screen flex">

        <div className="h-full w-2/5 border-r border-gray-300 relative">

          <LoadingBoundary loading={stadiumLocationsAreLoading}>

            <div className="h-20 absolute top-0 left-0 w-full border-b border-gray-300 py-1.5">
              <PremierLeagueLogoSvg />
            </div>

            <div className="w-full h-1/2 pt-20 border-b border-gray-300 flex">

              <div className="h-full w-3/5 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {locationCards}
              </div>

              <div className="h-full w-2/5 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 border-l border-gray-300">
                <LoadingBoundary loading={crimesForStadiumAreLoading}>

                  {
                  crimesExist() ? 
                  crimeCards : 
                  (
                  <Placeholder text="Select a stadium">
                      <FiEye />
                  </Placeholder>
                  )
                  }
                </LoadingBoundary>
              </div>

            </div>

            <div className="w-full h-1/2">
              {
                  selectedStadiumLocation && selectedCrime ?
                  <CrimeInsight />
                  :
                  <Placeholder text="Inspect a crime">
                    <FiEye />
                  </Placeholder>
              }
            </div>
          
          </LoadingBoundary>

        </div>
        
        <Map />

    </main>
  );
}

export default connector(App);
