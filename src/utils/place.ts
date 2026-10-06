import { PLACES, type IslandGroup } from "@/data/philippines/places";

export interface PlaceMetadata {
  id: string;
  name: string;
  capital: string;
  region: string;
  islandGroup: IslandGroup;
}

export function getPlaceMetadata(
  properties: Record<string, unknown> | null | undefined,
): PlaceMetadata | null {
  if (!properties) return null;

  const id = String(properties.psgc_code ?? "");
  const place = PLACES[id];

  if (!place) return null;

  return {
    id,
    name: String(properties.psgc_name ?? properties.ADM2_EN ?? "Unknown"),
    capital: place.capital,
    region: place.region,
    islandGroup: place.islandGroup,
  };
}
