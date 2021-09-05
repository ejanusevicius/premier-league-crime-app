import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { ApplicationState } from "../interfaces/ApplicationState";

const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  


function Map({

}) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
      })
    
      const [map, setMap] = React.useState(null)
      


      const windowAny = window as any;

      const onLoad = React.useCallback(function callback(map) {
        const bounds = new windowAny.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    

      return (
      <div className="h-full w-3/5">
          {isLoaded ?
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount} >

            </GoogleMap>
            :
            null
          }
      </div>);
};

export default Map;