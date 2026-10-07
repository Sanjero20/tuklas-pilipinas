import type { PlaceMetadata } from "./place";

export function getRandomProvince(
  provinces: PlaceMetadata[],
  guessedIds: Set<string>,
) {
  const available = provinces.filter(
    (province) => !guessedIds.has(province.id),
  );

  return available[Math.floor(Math.random() * available.length)];
}
