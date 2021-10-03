import React, { useEffect, useState } from 'react'
import {Icon} from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "../icons/covid-19.png"
import Dashboard from './Dashboard';

const Maps = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://corona-api.com/countries`);
      const json = await res.json();
      setData(json.data)
    }
    fetchData()
  }, [])

  const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25,25],
});

  const defaultCenter = [51.05, 17.02]

  const mapStyles = {
    height: '100vh', 
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
        {!data.length ? (
          <h1 style={{ fontSize: 180, color: 'red' }}>No markers</h1>
        ) : (
          data.map((el, index) => 
            el === undefined || index === undefined ? (
              ''
            ) : (
              <Marker
              icon={myIcon}
                key={index}
                position={{ lat: el.coordinates.latitude, lng: el.coordinates.longitude }}
              >
                <Popup>
                  Total deaths: {el.latest_data.deaths} <br />
                  Total confirmed: {el.latest_data.confirmed}
                </Popup>
              </Marker>
            )
          )
        )}
      </MapContainer>
      <Dashboard data={data} />
    </div>
  )
}
export default Maps
