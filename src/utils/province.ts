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

export function getRandomChoices(
  provinces: PlaceMetadata[],
  correctProvince: PlaceMetadata,
  count = 4,
) {
  const others = provinces.filter(
    (province) => province.id !== correctProvince.id,
  );

  const shuffled = [...others].sort(() => Math.random() - 0.5);

  return [correctProvince, ...shuffled.slice(0, count - 1)].sort(
    () => Math.random() - 0.5,
  );
}
