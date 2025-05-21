import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./googlemap.css";

// Fix for marker icons (Vite compatible)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl:
    new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl:
    new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const GoogleMap = () => {
  // Coordinates for 332 Ikorodu Road, Lagos (approximate)
  const churchPosition = [6.5643487, 3.3676279]; // Updated to match the real-world address

  return (
    <div className="map">
      <div className="text">
        Click <a href="https://www.google.com/maps/place/332+Ikorodu+Rd,+Lagos/" target="_blank" rel="noopener noreferrer">here</a> to navigate to Google Maps
      </div>

      <div style={{ height: "90vh", width: "100%" }}>
        <MapContainer
          center={churchPosition}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={churchPosition}>
            <Popup>RCCG Newspring Church</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default GoogleMap;