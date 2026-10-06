import type { GeoJsonProperties } from "geojson";

interface ProvinceProperties {
  ADM0_EN: string;
  ADM0_PCODE: string;

  ADM1ALT1EN: string | null;
  ADM1_EN: string;
  ADM1_PCODE: string;

  ADM2_EN: string;
  ADM2_PCODE: string;

  AREA_SQKM: number;
  Shape_Area: number;
  Shape_Leng: number;

  date: string;
  match_confidence: number;
  match_method: string;

  psgc_code: string;
  psgc_id: string;
  psgc_name: string;
  psgc_status: string;
  psgc_type: "province" | "region";

  validOn: string;
  validTo: string | null;
}

export function getPlaceMetadata(data: GeoJsonProperties) {
  if (!data) return;

  const metadata = data as ProvinceProperties;

  const properties = {
    id: metadata.psgc_id,
    region: metadata.ADM1_EN,
    province: metadata.ADM2_EN,
  };

  return properties;
}
