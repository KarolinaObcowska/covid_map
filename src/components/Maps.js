import React, { useEffect, useState } from 'react'
// import { Marker, InfoWindow, Map, GoogleApiWrapper } from 'google-maps-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Maps = () => {
  const [markers, setMarkers] = useState([])
  const [deaths, setDeaths] = useState([])
  const [confirmed, setConfirmed] = useState([])

  useEffect(() => {
    const url =
      'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=Country_Region,Deaths,Confirmed&outSR=4326&f=json'

    const fetchData = async () => {
      const response = await fetch(url)
      const json = await response.json()
      let arr = json.features
      let arr2 = arr.map((e) => e.attributes)
      setDeaths(arr2.map((e) =>  e.Deaths))
      setConfirmed(arr2.map((e) =>  e.Confirmed))
      setMarkers(arr.map((e) => e.geometry))
    }
    fetchData()
  }, [])

  const defaultCenter = [51.05, 17.02]
  const mapStyles = {
    height: '95vh', 
    backgroundColor: 'green'
  }
  return (
    <div
      style={{
        height: '700px',
      }}
    >
      <MapContainer
        center={defaultCenter}
        zoom={4}
        scrollWheelZoom={false}
        style={mapStyles}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!markers.length ? (
          <h1 style={{ fontSize: 180, color: 'red' }}>No markers</h1>
        ) : (
          
          markers.map((marker, index) => 
            marker === undefined || index === undefined ? (
              ''
            ) : (
              <Marker
                key={index}
                position={{ lat: Number(marker.y), lng: Number(marker.x) }}
              >
                <Popup>
                  Deaths: {deaths[index]} <br />
                  Confirmed: {confirmed[index]}
                </Popup>
              </Marker>
            )
          )
        )}
      </MapContainer>
      ,
    </div>
  )
}
export default Maps
