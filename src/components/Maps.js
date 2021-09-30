import React, {useEffect, useState} from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Markers from './Markers';

const Maps = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
      fetchData();
  }, []);

  
    async function fetchData() {
        fetch('https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=Country_Region,Deaths,Confirmed&outSR=4326&f=json')
        .then(res => res.json())
        .then(({features}) => {
          setMarkers(features)
        })
        // const json = await res.json();
        // const arr = [];
        // const data = json.features.map(marker => {
        //     marker = marker.geometry
        //     arr.push(marker)
        // })
        // setMarkers(arr)
    }
    const mapStyles = {        
      height: "100vh",
      width: "100%"};
    
    const defaultCenter = {
      lat: 51.05, lng: 17.02
    }
    
    return (
       <LoadScript
         googleMapsApiKey='AIzaSyAe-6Nx27KG8WjYbfbtQIkASpJmklsmo-U'>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={5}
            center={defaultCenter}
          >
            <Markers markers={markers}/>
          </GoogleMap>
       </LoadScript>
    )
};

export default Maps
