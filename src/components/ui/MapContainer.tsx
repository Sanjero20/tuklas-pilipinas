import { MapContainer, TileLayer } from "react-leaflet";

function Map() {
  return (
    <MapContainer
      center={[12.8797, 121.774]}
      className="h-full w-full"
      zoom={6}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      />
    </MapContainer>
  );
}

export default Map;
