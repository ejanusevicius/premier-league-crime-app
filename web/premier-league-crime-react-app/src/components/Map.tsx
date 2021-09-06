import { useState, useEffect } from "react";
import { connect, ConnectedProps } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { MapConstants } from "../classes/MapConstants";
import { MapUtilities } from "../classes/MapUtilities";
import { CoordinateSet } from "../interfaces/CoordinateSet";
import { StadiumLocation } from "../interfaces/StadiumLocation";
import { ApplicationState } from "../interfaces/ApplicationState";
import { TerraformParameterParser } from "../classes/TerraformParameterParser";

const mapStateToProps = (state: ApplicationState) => {
  return {
    selectedStadiumLocation: state.selectedStadiumLocation,
    crimes: state.crimes
  }
}
const connector = connect(mapStateToProps);
type PropTypes = ConnectedProps<typeof connector>;

function Map({
  selectedStadiumLocation,
  crimes
}: PropTypes) {

  const [coordinates, setCoordinates] = useState<CoordinateSet>(MapConstants.LEEDS_COORDINATES);
  const [zoomValue, setZoomValue] = useState<number>(MapConstants.INITIAL_MAP_ZOOM);

  function focusLocation(location: StadiumLocation) {
      const { latitude, longitude } = location;
      setCoordinates(MapUtilities.createCoordinateArray(latitude, longitude))
      setZoomValue(prevState => MapUtilities.getFocusedStadiumZoom(prevState));
  }

  useEffect(() => {
    if (selectedStadiumLocation !== null) {
      focusLocation(selectedStadiumLocation);
    }
  }, [selectedStadiumLocation]);

  type MarkerPropTypes = { lat: Number, lng: Number };
  const Marker = ({ lat, lng }: MarkerPropTypes) => (
  <div className="rounded-full flex items-center justify-center w-6 h-6 bg-white border-2 border-purple-500 flex items-center justify-center cursor-pointer text-black font-bold text-xs">
      {crimes?.length}
  </div>);

  return (
    <div className="h-full w-3/5">
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{ key : TerraformParameterParser.getGoogleMapsApiKey() }}
        defaultZoom={MapConstants.INITIAL_MAP_ZOOM}
        center={coordinates as never}
        zoom={zoomValue}>

          {
            selectedStadiumLocation &&
            <Marker lat={coordinates[0]} lng={coordinates[1]}  />
          }

        </GoogleMapReact>
    </div>
  );
};

export default connector(Map);