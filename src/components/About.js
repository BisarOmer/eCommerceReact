import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//360 image viewer
import Tridi from 'react-tridi';
import ReactPannellum, { getConfig } from "react-pannellum";


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function About() {

  const config = {
    autoRotate: -2,
    autoLoad: true,
    description: 'Our Office',
    author: "Shopping Krd"
  };

  const position = [35.55653717337405, 45.431297975395125]

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        About us
    </Typography>

      <Card style={{ padding: 10, margin: 10 }}>
        <Typography variant="body1" gutterBottom align="left">
          Shopping Krd. is a global commerce leader that connects millions of buyers and sellers
          around the world. We exist to enable economic opportunity for individuals,
          entrepreneurs, businesses and organizations of all sizes. Our portfolio of brands
          includes eBay Marketplace and eBay Classifieds Group, operating in 190 markets around the world.
        </Typography>
      </Card>
      <Typography variant="h6" gutterBottom>
        Our Office
    </Typography>

      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource="https://images.pixexid.com/xh4vd8pd-a-screen-shot-of-a-living-room.jpeg?w=4000&dpr=0.9"
        config={config}
        style={{
          width: '%100',
          height: "600px",
        }}
      />

      <Typography variant="h6" gutterBottom style={{marginTop: 15,}}>
        Visit us
    </Typography>

      <MapContainer style={{ height: 400,}} center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} >
          <Popup>
            our headquarter
          </Popup>
        </Marker>
      </MapContainer>

      <Typography variant="h6" gutterBottom style={{marginTop: 15,}}>
        Developed By Dever
    </Typography>

    </div>
  );

}
export default About;