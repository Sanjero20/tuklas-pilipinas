import { useMemo, useState } from "react";
import type { Feature } from "geojson";
import type { IslandGroup } from "@/data/philippines/places";

import provincesData from "@/data/geojson/provinces.json";
import { getPlaceMetadata } from "@/utils/place";
import { getRandomProvince } from "@/utils/province";

const provinces = provincesData.features
  .map((feature) => getPlaceMetadata(feature.properties))
  .filter((place) => place !== null);

type Props = {
  showFeedback: (type: "correct" | "wrong", provinceId?: string) => void;
  clearFeedback: () => void;
};

export function useLocateGame({ showFeedback, clearFeedback }: Props) {
  const [islandGroup, setIslandGroup] = useState<IslandGroup>();
  const [streak, setStreak] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  const playableProvinces = useMemo(() => {
    if (!islandGroup) return provinces;

    return provinces.filter((province) => province.islandGroup === islandGroup);
  }, [islandGroup]);

  const [currentProvince, setCurrentProvince] = useState(() =>
    getRandomProvince(provinces, new Set()),
  );

  const handleClick = (feature: Feature) => {
    const clickedProvince = getPlaceMetadata(feature.properties);

    if (!clickedProvince || !currentProvince) return;

    if (clickedProvince.id !== currentProvince.id) {
      showFeedback("wrong", clickedProvince.id);
      setStreak(0);
      return;
    }

    const nextGuessed = new Set(guessed);
    nextGuessed.add(currentProvince.id);

    setGuessed(nextGuessed);
    setStreak((prev) => prev + 1);

    if (nextGuessed.size === playableProvinces.length) {
      setIsComplete(true);
      showFeedback("correct");
      return;
    }

    showFeedback("correct");

    const nextProvince = getRandomProvince(playableProvinces, nextGuessed);

    if (nextProvince) {
      setCurrentProvince(nextProvince);
    }
  };

  const handleSkip = () => {
    if (!currentProvince) return;

    const nextProvince = getRandomProvince(playableProvinces, guessed);

    if (nextProvince) {
      setCurrentProvince(nextProvince);
    }

    setStreak(0);
    clearFeedback();
  };

  const handleIslandChange = (group?: IslandGroup) => {
    const nextProvinces = group
      ? provinces.filter((province) => province.islandGroup === group)
      : provinces;

    const nextProvince = getRandomProvince(nextProvinces, new Set());

    setIslandGroup(group);
    setGuessed(new Set());
    setStreak(0);
    setCurrentProvince(nextProvince);
    setIsComplete(false);
  };

  const resetGame = () => {
    const nextProvince = getRandomProvince(provinces, new Set());

    setIslandGroup(undefined);
    setGuessed(new Set());
    setStreak(0);
    setCurrentProvince(nextProvince);
    setIsComplete(false);

    clearFeedback();
  };

  return {
    islandGroup,
    currentProvince,
    playableProvinces,
    guessed,
    streak,
    isComplete,

    handleClick,
    handleSkip,
    handleIslandChange,

    resetGame,
  };
}
