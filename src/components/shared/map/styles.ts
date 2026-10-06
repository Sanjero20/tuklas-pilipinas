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
  fillColor: "color-mix(in srgb, var(--accent) 45%, var(--land))",
  fillOpacity: 1,
};

export const SELECTED_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-accent)",
  fillOpacity: 1,
};

export const SELECTED_HOVER_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "color-mix(in srgb, var(--color-accent) 75%, var(--color-land))",
  fillOpacity: 1,
};

export const CORRECT_STYLES: PathOptions = {
  color: "var(--color-mute)",
  weight: 2,
  fillColor: "var(--color-ok)",
  fillOpacity: 1,
};

export const CORRECT_HOVER_STYLES: PathOptions = {
  color: "var(--color-ink)",
  weight: 2,
  fillColor: "color-mix(in srgb, var(--color-ok) 75%, var(--color-land))",
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
  fillColor: "color-mix(in srgb, var(--color-mute) 45%, var(--color-land))",
  fillOpacity: 0.5,
};
