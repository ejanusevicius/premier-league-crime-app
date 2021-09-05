import { ApplicationState } from "../interfaces/ApplicationState";
import { useState } from "react";
import { useEffect } from "react";
import { connect, ConnectedProps } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { MapConstants } from "../classes/MapConstants";
import { MapUtilities } from "../classes/MapUtilities";
import { CoordinateSet } from "../interfaces/CoordinateSet";
import { StadiumLocation } from "../interfaces/StadiumLocation";

const GOOGLE_MAPS_API_KEY = "API_KEY_GOES_HERE";

const mapStateToProps = (state: ApplicationState) => {
  return {
    selectedStadiumLocation: state.selectedStadiumLocation
  }
}
const connector = connect(mapStateToProps);

type PropTypes = ConnectedProps<typeof connector>;

function Map({
  selectedStadiumLocation
}: PropTypes) {

  const [coordinates, setCoordinates] = useState<CoordinateSet>(MapConstants.LEEDS_COORDINATES);
  const [zoomValue, setZoomValue] = useState<number>(MapConstants.INITIAL_MAP_ZOOM);

  function focusLocation(location: StadiumLocation) {
    const { latitude, longitude } = location;
    setCoordinates(MapUtilities.createCoordinateArray(latitude, longitude))
    setZoomValue(MapConstants.MAP_ZOOM_FOR_STADIUM);
  }

  useEffect(() => {
    if (selectedStadiumLocation !== null) {
      focusLocation(selectedStadiumLocation);
    }
  }, [selectedStadiumLocation]);

  return (
    <div className="h-full w-3/5">
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        bootstrapURLKeys={{ key :GOOGLE_MAPS_API_KEY }}
        defaultZoom={MapConstants.INITIAL_MAP_ZOOM}
        center={coordinates as never}
        zoom={zoomValue} />
    </div>
  );
};

export default connector(Map);