/* eslint-disable react-hooks/exhaustive-deps */
import L from "leaflet";

import { useMemo } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";

import type { StyleFunction } from "leaflet";
import type { Feature, FeatureCollection } from "geojson";

import { PHILIPPINES_CENTER, PHILIPPINES_BOUNDS } from "./config";
import {
  CORRECT_STYLES,
  HIGHLIGHTED_STYLES,
  HOVER_STYLES,
  LAND_STYLES,
  SELECTED_STYLES,
  WRONG_STYLES,
} from "./styles";

import provincesData from "@/data/geojson/provinces.json";
import { getPlaceMetadata } from "@/utils/place";
import type { IslandGroup } from "@/data/philippines/places";
import MapAutoFocus from "./MapAutoFocus";

const provinces = provincesData as FeatureCollection;

interface Props {
  selectedPlaceId?: string;
  selectedRegion?: string;
  islandGroup?: IslandGroup;

  // For play mode
  wrongPlaceId?: string;
  guessedPlaceIds?: Set<string>;

  onPlaceClick?: (feature: Feature) => void;
}

function PhilippinesMap({
  selectedPlaceId,
  selectedRegion,
  islandGroup,
  wrongPlaceId,
  guessedPlaceIds,
  onPlaceClick,
}: Props) {
  const getStyle: StyleFunction = (feature) => {
    if (!feature) return LAND_STYLES;

    const metadata = getPlaceMetadata(feature.properties);

    if (!metadata) return LAND_STYLES;

    if (metadata.id === wrongPlaceId) {
      return WRONG_STYLES;
    }

    if (guessedPlaceIds?.has(metadata.id)) {
      return CORRECT_STYLES;
    }

    if (metadata.id === selectedPlaceId) {
      return SELECTED_STYLES;
    }

    if (selectedRegion) {
      return metadata.region === selectedRegion
        ? HIGHLIGHTED_STYLES
        : LAND_STYLES;
    }

    if (islandGroup) {
      return metadata.islandGroup === islandGroup
        ? HIGHLIGHTED_STYLES
        : LAND_STYLES;
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
      <MapAutoFocus selectedPlaceId={selectedPlaceId} />

      <GeoJSON
        data={provinces}
        style={getStyle}
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
}

export default PhilippinesMap;
