import L from "leaflet";
import { useCallback, useState } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";

import type { StyleFunction } from "leaflet";
import type { Feature, FeatureCollection } from "geojson";

import { PHILIPPINES_CENTER, PHILIPPINES_BOUNDS } from "./config";
import {
  CORRECT_HOVER_STYLES,
  CORRECT_STYLES,
  DISABLED_STYLES,
  HOVER_STYLES,
  LAND_STYLES,
  SELECTED_HOVER_STYLES,
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
  wrongPlaceId?: string | null;
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
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);

  const getStyle = useCallback<StyleFunction>(
    (feature) => {
      if (!feature) return LAND_STYLES;

      const metadata = getPlaceMetadata(feature.properties);

      if (!metadata) return LAND_STYLES;

      // Wrong answer
      if (metadata.id === wrongPlaceId) {
        return WRONG_STYLES;
      }

      // Correct answer
      if (guessedPlaceIds?.has(metadata.id)) {
        return metadata.id === hoveredPlaceId
          ? CORRECT_HOVER_STYLES
          : CORRECT_STYLES;
      }

      // Selected province
      if (metadata.id === selectedPlaceId) {
        return metadata.id === hoveredPlaceId
          ? SELECTED_HOVER_STYLES
          : SELECTED_STYLES;
      }

      // Region filter
      if (selectedRegion) {
        if (metadata.region !== selectedRegion) {
          return DISABLED_STYLES;
        }

        return metadata.id === hoveredPlaceId ? HOVER_STYLES : LAND_STYLES;
      }

      // Island group filter
      if (islandGroup) {
        if (metadata.islandGroup !== islandGroup) {
          return DISABLED_STYLES;
        }

        return metadata.id === hoveredPlaceId ? HOVER_STYLES : LAND_STYLES;
      }

      // Normal
      return metadata.id === hoveredPlaceId ? HOVER_STYLES : LAND_STYLES;
    },
    [
      hoveredPlaceId,
      wrongPlaceId,
      guessedPlaceIds,
      selectedPlaceId,
      selectedRegion,
      islandGroup,
    ],
  );

  const isPlaceDisabled = (metadata: ReturnType<typeof getPlaceMetadata>) => {
    if (!metadata) return true;

    if (selectedRegion && metadata.region !== selectedRegion) {
      return true;
    }

    if (islandGroup && metadata.islandGroup !== islandGroup) {
      return true;
    }

    return false;
  };

  const getLayerFeature = (e: L.LeafletMouseEvent) => {
    const layer = e.propagatedFrom as L.Path & {
      feature?: Feature;
    };

    return layer.feature;
  };

  const eventHandlers = {
    click: (e: L.LeafletMouseEvent) => {
      const feature = getLayerFeature(e);
      if (!feature) return;

      const metadata = getPlaceMetadata(feature.properties);

      if (!metadata) return;
      if (isPlaceDisabled(metadata)) return;

      if (guessedPlaceIds?.has(metadata.id)) return;

      onPlaceClick?.(feature);
    },

    mouseover: (e: L.LeafletMouseEvent) => {
      const feature = getLayerFeature(e);
      if (!feature) return;

      const metadata = getPlaceMetadata(feature.properties);
      if (isPlaceDisabled(metadata)) return;

      setHoveredPlaceId(metadata?.id ?? null);
    },

    mouseout: () => {
      setHoveredPlaceId(null);
    },
  };

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
