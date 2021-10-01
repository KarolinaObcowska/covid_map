import React, {useEffect, useState} from 'react'
import { Marker, InfoWindow, Map, GoogleApiWrapper } from 'google-maps-react';

const Maps = ({google}) => {
    const [markers, setMarkers] = useState([]);
    const [statistics, setStatistics] = useState([])

    useEffect(() => {
      const url = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=Country_Region,Deaths,Confirmed&outSR=4326&f=json';

      const fetchData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        let arr = json.features;
        setMarkers(arr.map(e => e.geometry))
      }
        fetchData()
  }, []);


    const mapStyles = {        
      height: "100vh",
      width: "100%"};
    
    const defaultCenter = {
      lat: 51.05, lng: 17.02
    }
    
    return (
     <Map
     google={google}
     zoom={8}
     style={mapStyles}
     initialCenter={defaultCenter}
     >
       {!markers.length ? (
                <h1 style={{fontSize: 180, color: 'red'}}>No markers</h1>
            ) : (
                    markers.map((marker,index) => (
                      marker === undefined ? '' :
                         <Marker 
                            key={index} 
                            position={{ lat: Number(marker.y), lng: Number(marker.x) }}>
                                <InfoWindow position={{lat: Number(marker.x), lng: Number(marker.y)}}
                                options={{ maxWidth: 100 }}>
                                    <span>COVID</span>
                                </InfoWindow>
                         </Marker>
                    ))
                )
            }
       </Map>
    )
};

export default GoogleApiWrapper({apiKey: ('AIzaSyAe-6Nx27KG8WjYbfbtQIkASpJmklsmo-U')})(Maps)

