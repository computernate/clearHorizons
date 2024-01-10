import React, { useState, useRef } from 'react';
import styles from 'css/general/GoogleMapAutocomplete.module.css'
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.511744, // Default center latitude
  lng: -111.841186 // Default center longitude
};

function GoogleMapAutocomplete({ setAddress }) {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('Select your Address')
  const autocompleteRef = useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);
    setMap(map);
    map.setZoom(10);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPlaceSelected = (place) => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      const location = place.geometry.location;
      updateMarkerAndAddress(location.lat(), location.lng(), place.formatted_address);
    }
  };

  const onMapClick = (event) => {
    updateMarkerAndAddress(event.latLng.lat(), event.latLng.lng());
  };

  const reverseGeocode = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC9et5_WfSEq-uxAGLvEirLzbc4_ILCg3U`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        // Assuming you want the first result
        if (data.results[0]) {
          return data.results[0].formatted_address;
        }
      }
      throw new Error('No results found');
    } catch (error) {
      console.error('Error during reverse geocoding', error);
      return '';
    }
  };

  const updateMarkerAndAddress = (lat, lng, address = '') => {
    const newMarkerPosition = { lat, lng };
    setMarkerPosition(newMarkerPosition);
    map.panTo(newMarkerPosition);

    if (address) {
      setSelectedAddress(address)
      setAddress(address);
    } else {
      reverseGeocode(lat, lng).then((newAddress)=>{
        setSelectedAddress(newAddress)
        setAddress(newAddress);
      })
    }
  };

  return (
    <div className={styles.container}>
      <LoadScript
        googleMapsApiKey="AIzaSyC9et5_WfSEq-uxAGLvEirLzbc4_ILCg3U" // Replace with your Google Maps API key
           libraries={["places"]}
      >
        <h5 className={styles.header}>{selectedAddress}</h5>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
        >
          { /* Autocomplete component */ }

          { /* Marker component */ }
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
          <Autocomplete
            onLoad={ref => autocompleteRef.current = ref}
            onPlaceChanged={onPlaceSelected}
          >
            <input
              type="text"
              placeholder="Enter an address"
              style={{ width: '100%', height: '40px', boxSizing: 'border-box'}}
            />
          </Autocomplete>
      </LoadScript>
    </div>
  )
}

export default GoogleMapAutocomplete;