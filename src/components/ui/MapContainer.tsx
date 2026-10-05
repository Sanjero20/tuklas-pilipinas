import { GeoJSON, MapContainer } from "react-leaflet";
import type { FeatureCollection } from "geojson";

// import regionsData from "@/data/geojson/regions.json";
import provincesData from "@/data/geojson/provinces.json";
import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";

// const regions = regionsData as FeatureCollection;
const provinces = provincesData as FeatureCollection;

const landStyles = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-land)",
  fillOpacity: 1,
};

// Philippines
const center = [12.8797, 121.774] as LatLngExpression;
const boundary = [
  [4.277256, 122.416079],
  [21.33895, 121.721292],
  [3.086835, 116.133513],
  [13.5145, 127.301521],
] as LatLngBoundsExpression;

function Map() {
  return (
    <MapContainer
      center={center}
      className="h-full w-full"
      style={{ backgroundColor: "var(--color-sea)" }}
      zoom={5}
      minZoom={5.25}
      maxZoom={8}
      maxBounds={boundary}
      attributionControl={false}
      doubleClickZoom={false}
    >
      {/* <GeoJSON data={regions} style={landStyles} /> */}
      <GeoJSON data={provinces} style={landStyles} />
    </MapContainer>
  );
}

export default Map;
