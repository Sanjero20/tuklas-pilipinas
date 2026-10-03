import { GeoJSON, MapContainer } from "react-leaflet";
import type { FeatureCollection } from "geojson";

// import regionsData from "@/data/geojson/regions.json";
import provincesData from "@/data/geojson/provinces.json";

// const regions = regionsData as FeatureCollection;
const provinces = provincesData as FeatureCollection;

const landStyles = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-land)",
  fillOpacity: 1,
};

function Map() {
  return (
    <MapContainer
      center={[12.8797, 121.774]}
      style={{ backgroundColor: "var(--color-sea)" }}
      className="h-full w-full"
      zoom={6}
      attributionControl={false}
    >
      {/* <GeoJSON data={regions} style={landStyles} /> */}
      <GeoJSON data={provinces} style={landStyles} />
    </MapContainer>
  );
}

export default Map;
