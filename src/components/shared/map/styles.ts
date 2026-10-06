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

export const HIGHLIGHTED_STYLES: PathOptions = {
  fillColor: "color-mix(in srgb, var(--accent) 20%, var(--land))",
  fillOpacity: 1,
  color: "var(--color-ink)",
  weight: 1,
};

export const SELECTED_STYLES: PathOptions = {
  color: "var(--color-accent)",
  weight: 3,
  fillColor: "var(--color-accent)",
  fillOpacity: 1,
};

export const CORRECT_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-ok)",
  fillOpacity: 1,
};

export const WRONG_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-bad)",
  fillOpacity: 1,
};

export const DISABLED_STYLES: PathOptions = {
  color: "var(--color-sea)",
  weight: 2,
  fillColor: "color-mix(in srgb, var(--accent) 30%, var(--land))",
  fillOpacity: 1,
};
