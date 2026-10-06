import type { FeatureCollection } from "geojson";
import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import provincesData from "@/data/geojson/provinces.json";

const provinces = provincesData as FeatureCollection;

interface Props {
  selectedPlaceId?: string;
}

function MapAutoFocus({ selectedPlaceId }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!selectedPlaceId) return;

    const feature = provinces.features.find(
      (feature) => feature.properties?.psgc_code === selectedPlaceId,
    );

    if (!feature) return;

    const bounds = L.geoJSON(feature).getBounds();

    if (!bounds.isValid()) return;

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 7,
      animate: true,
    });
  }, [selectedPlaceId, map]);

  return null;
}

export default MapAutoFocus;
