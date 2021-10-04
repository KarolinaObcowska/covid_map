import React, { useEffect, useState } from 'react'
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import markerIconPng from '../icons/covid-19.png'
import Dashboard from './Dashboard'
import Chart from './Chart'
import InfoCard from './InfoCard'

const Maps = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://corona-api.com/countries`)
      const json = await res.json()
      setData(json.data)
    }
    fetchData()
  }, [])

  const myIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 25],
  })

  const defaultCenter = [51.05, 17.02]

  const mapStyles = {
    height: '100vh',
    maxWidth: '50vw',
  }

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={6}>
          <MapContainer
            center={defaultCenter}
            zoom={4}
            scrollWheelZoom={false}
            style={mapStyles}
          >
            <TileLayer
              attribution=""
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!data.length ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              data.map((el, index) =>
                el === undefined || index === undefined ? (
                  ''
                ) : (
                  <Marker
                    icon={myIcon}
                    key={index}
                    position={{
                      lat: el.coordinates.latitude,
                      lng: el.coordinates.longitude,
                    }}
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
        </Grid>
        <Grid item xs={6}>
          <Chart />
          <InfoCard data={data} />
          <Dashboard data={data} />
        </Grid>
      </Grid>
      <Grid container spacing={0.5}>
        <Grid item xs={6}>
          
        </Grid>
      </Grid>
    </>
  )
}
export default Maps
