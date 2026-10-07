import { useState } from "react";

import provincesData from "@/data/geojson/provinces.json";
import type { IslandGroup } from "@/data/philippines/places";
import { getPlaceMetadata } from "@/utils/place";
import { getRandomChoices, getRandomProvince } from "@/utils/province";

const provinces = provincesData.features
  .map((feature) => getPlaceMetadata(feature.properties))
  .filter((place) => place !== null);

type UseNameGameProps = {
  showFeedback: (type: "correct" | "wrong", provinceId?: string) => void;
  clearFeedback: () => void;
};

export function useNameGame({ showFeedback, clearFeedback }: UseNameGameProps) {
  const [islandGroup, setIslandGroup] = useState<IslandGroup>();

  const [game, setGame] = useState(() => {
    const province = getRandomProvince(provinces, new Set());

    return {
      currentProvince: province,
      choices: province ? getRandomChoices(provinces, province) : [],
    };
  });

  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const playableProvinces = islandGroup
    ? provinces.filter((province) => province.islandGroup === islandGroup)
    : provinces;

  const handleAnswer = (provinceId: string) => {
    const currentProvince = game.currentProvince;

    if (!currentProvince) return;

    if (provinceId !== currentProvince.id) {
      setStreak(0);
      showFeedback("wrong", provinceId);
      return;
    }

    const nextGuessed = new Set(guessed);
    nextGuessed.add(currentProvince.id);

    setGuessed(nextGuessed);
    setStreak((prev) => prev + 1);
    showFeedback("correct");

    if (nextGuessed.size === playableProvinces.length) {
      setIsComplete(true);
      return;
    }

    const nextProvince = getRandomProvince(playableProvinces, nextGuessed);

    if (!nextProvince) return;

    setGame({
      currentProvince: nextProvince,
      choices: getRandomChoices(playableProvinces, nextProvince),
    });
  };

  const handleSkip = () => {
    const currentProvince = game.currentProvince;

    if (!currentProvince) return;

    const nextProvince = getRandomProvince(playableProvinces, guessed);

    if (!nextProvince) return;

    setGame({
      currentProvince: nextProvince,
      choices: getRandomChoices(playableProvinces, nextProvince),
    });

    setStreak(0);
    clearFeedback();
  };

  const handleIslandChange = (group?: IslandGroup) => {
    const nextProvinces = group
      ? provinces.filter((province) => province.islandGroup === group)
      : provinces;

    const nextProvince = getRandomProvince(nextProvinces, new Set());

    if (!nextProvince) return;

    setIslandGroup(group);

    setGame({
      currentProvince: nextProvince,
      choices: getRandomChoices(nextProvinces, nextProvince),
    });

    setGuessed(new Set());
    setStreak(0);
    setIsComplete(false);

    clearFeedback();
  };

  const resetGame = () => {
    const nextProvince = getRandomProvince(provinces, new Set());

    if (!nextProvince) return;

    setIslandGroup(undefined);

    setGame({
      currentProvince: nextProvince,
      choices: getRandomChoices(provinces, nextProvince),
    });

    setGuessed(new Set());
    setStreak(0);
    setIsComplete(false);

    clearFeedback();
  };

  return {
    islandGroup,
    currentProvince: game.currentProvince,
    playableProvinces,
    choices: game.choices,
    guessed,
    streak,
    isComplete,

    handleAnswer,
    handleSkip,
    handleIslandChange,

    resetGame,
  };
}
