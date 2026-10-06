import { PLACES } from "@/data/philippines/places";

export function getPlaceMetadata(properties: GeoJSON.GeoJsonProperties) {
  if (!properties) return null;

  const place = PLACES[properties.psgc_code];

  return {
    id: properties.psgc_id,
    name: properties.psgc_name,
    region: properties.ADM1_EN,
    regionCode: properties.ADM1_PCODE,
    area: properties.AREA_SQKM,
    capital: place?.capital ?? null,
  };
}
