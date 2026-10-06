/* eslint-disable react-hooks/exhaustive-deps */
import L from "leaflet";

import { useMemo } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";

import type { StyleFunction } from "leaflet";
import type { Feature, FeatureCollection } from "geojson";

import { PHILIPPINES_CENTER, PHILIPPINES_BOUNDS } from "./config";
import { HOVER_STYLES, LAND_STYLES, SELECTED_STYLES } from "./styles";

import provincesData from "@/data/geojson/provinces.json";

const provinces = provincesData as FeatureCollection;

interface Props {
  selectedPlaceId?: string;
  onPlaceClick?: (feature: Feature) => void;
}

function PhilippinesMap({ selectedPlaceId, onPlaceClick }: Props) {
  const getStyle: StyleFunction = (feature) => {
    if (!feature) return LAND_STYLES;

    const isSelected = feature.properties?.psgc_id === selectedPlaceId;

    if (isSelected) {
      return SELECTED_STYLES;
    }

    return LAND_STYLES;
  };

  const eventHandlers = useMemo(
    () => ({
      click: (e: L.LeafletMouseEvent) => {
        const layer = e.propagatedFrom as L.Path & {
          feature?: Feature;
        };

        if (!layer.feature) return;

        onPlaceClick?.(layer.feature);
      },

      mouseover: (e: L.LeafletMouseEvent) => {
        const layer = e.propagatedFrom as L.Path & {
          feature?: Feature;
        };

        if (!layer.feature) return;

        layer.setStyle(HOVER_STYLES);
      },

      mouseout: (e: L.LeafletMouseEvent) => {
        const layer = e.propagatedFrom as L.Path & {
          feature?: Feature;
        };

        if (!layer.feature) return;

        layer.setStyle(getStyle(layer.feature));
      },
    }),
    [onPlaceClick, selectedPlaceId],
  );

  return (
    <MapContainer
      center={PHILIPPINES_CENTER}
      className="border-ink h-full w-full border"
      style={{ backgroundColor: "var(--color-sea)" }}
      zoom={5}
      minZoom={5.25}
      maxZoom={8}
      maxBounds={PHILIPPINES_BOUNDS}
      attributionControl={false}
      doubleClickZoom={false}
    >
      <GeoJSON
        data={provinces}
        style={getStyle}
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
}

export default PhilippinesMap;
