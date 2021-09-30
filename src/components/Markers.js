import React, { Fragment } from 'react'
import {Marker} from '@react-google-maps/api';

const Markers = (props) => {
    return (
        <Fragment>
            {!props.markers.length ? (
                <h1 style={{fontSize: 180, color: 'red'}}>No markers</h1>
            ) : (
                    props.markers.map((marker,index) => (
                        <Marker key={index} visible={true} position={{ lat: Number(marker.x), lng: Number(marker.y) }} />
                    ))
                )
                
            }
        </Fragment>
    )
}

export default Markers

