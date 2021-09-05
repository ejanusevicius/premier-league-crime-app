import { useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import Container from './components/Container';
import { ApiEndpoints } from './classes/ApiEndpoints';
import { Location } from './interfaces/Location';
import { setCrimes, setLocations } from './redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import LocationButton from './components/LocationButton';
import { ApplicationState } from './interfaces/ApplicationState';
import LocationCard from './components/LocationCard';
import Map from './components/Map';
import PremierLeagueLogoSvg from './components/PremierLeagueLogoSvg';
import { Crime } from './interfaces/Crime';
import CrimeCard from './components/CrimeCard';

const mapStateToProps = (state: ApplicationState) => {
  console.log(state);
  return {
    stadiumLocations: state.stadiumLocations,
    crimes: state.crimes
  }
}
const mapDispatchToProps = {
  setStadiumLocations: (locations: Location[]) => setLocations(locations),
  setCrimes: (crimes: Crime[]) => setCrimes(crimes)
}
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropTypes = ConnectedProps<typeof connector>;

function App({
  setStadiumLocations,
  stadiumLocations,
  setCrimes,
  crimes
}: PropTypes) {
  
  async function loadStadiumLocations() {
    const axiosResponse = await axios(ApiEndpoints.geStadiumLocations);
    const { data: { message: stadiumLocations } } = axiosResponse;
    setStadiumLocations(stadiumLocations);
  }

  async function selectStadiumLocationAndGetCrimes(location: Location) {
    console.log(location);
    const { latitude, longitude } = location;
    const axiosResponse = await axios(ApiEndpoints.getCrimesForStadiumCoorindates(latitude, longitude));
    console.log(axiosResponse);
    const { data: { message: { crimes, numberOfCrimes } } } = axiosResponse;
    setCrimes(crimes);
  }
  

  useEffect(() => {
    loadStadiumLocations();
  }, []);

  useEffect(() => {
    console.log(stadiumLocations);
  }, [stadiumLocations]);

  const locationCards = stadiumLocations.map(location => <LocationCard location={location} onClick={() => selectStadiumLocationAndGetCrimes(location)}/>)

  const crimeCards = crimes.map(crime => <CrimeCard crime={crime} onClick={null} />)

  return (
    <main className="w-full h-screen flex">

        <div className="h-full w-2/5 border-r border-gray-300 relative">

            <div className="h-20 absolute top-0 left-0 w-full border-b border-gray-300 py-1.5">
              <PremierLeagueLogoSvg />
            </div>

          <div className="w-full h-1/2 pt-20 border-b border-gray-300 flex">

            <div className="h-full w-1/2 overflow-y-scroll">

              {locationCards}

            </div>

            <div className="h-full w-1/2 overflow-y-scroll">
              {crimeCards}
            </div>

          </div>

          <div className="w-full h-1/2">

          </div>

        </div>

        <Map />


      {/* <div className="fixed bottom-0 left-0 bg-gray-800 h-12 w-full" /> */}

      



    </main>
  );
}

export default connector(App);
