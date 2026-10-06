import type { PathOptions } from "leaflet";

export const LAND_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-land)",
  fillOpacity: 1,
};

export const HOVER_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "color-mix(in srgb, var(--accent) 30%, var(--land))",
  fillOpacity: 1,
};

export const SELECTED_STYLES: PathOptions = {
  color: "var(--color-accent)",
  weight: 3,
  fillColor: "var(--color-accent)",
  fillOpacity: 1,
};
