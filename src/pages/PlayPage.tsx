import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import type { Feature } from "geojson";

import provincesData from "@/data/geojson/provinces.json";
import type { IslandGroup } from "@/data/philippines/places";
import { getPlaceMetadata } from "@/utils/place";

import PhilippinesMap from "@/components/shared/map/PhilippinesMap";
import Chip from "@/components/ui/Chip";
import Separator from "@/components/ui/Separator";
import ProgressBar from "@/components/ui/ProgressBar";
import IslandSelector from "@/components/shared/IslandSelector";
import { useGameTimer } from "@/hooks/useGameTimer";
import useGameFeedback from "@/hooks/useGameFeedback";
import GameStatus from "@/components/play/GameStatus";

const provinces = provincesData.features
  .map((feature) => getPlaceMetadata(feature.properties))
  .filter((place) => place !== null);

function PlayPage() {
  const [islandGroup, setIslandGroup] = useState<IslandGroup>();
  const [hint, setHint] = useState("");
  const [streak, setStreak] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());

  const [isComplete, setIsComplete] = useState(false);
  const { elapsedTime, resetTimer } = useGameTimer(isComplete);
  const { feedback, wrongProvinceId, showFeedback, clearFeedback } =
    useGameFeedback();

  const playableProvinces = useMemo(() => {
    if (!islandGroup) return provinces;

    return provinces.filter((province) => province.islandGroup === islandGroup);
  }, [islandGroup]);

  const getRandomProvince = (guessedIds: Set<string>) => {
    const available = playableProvinces.filter(
      (province) => !guessedIds.has(province.id),
    );

    return available[Math.floor(Math.random() * available.length)];
  };

  const [currentProvince, setCurrentProvince] = useState(() =>
    getRandomProvince(new Set()),
  );

  useEffect(() => {
    if (!isComplete) return;
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, [isComplete]);

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
    setHint("");

    if (nextGuessed.size === playableProvinces.length) {
      setIsComplete(true);
      showFeedback("correct");
      return;
    }

    showFeedback("correct");

    const nextProvince = getRandomProvince(nextGuessed);

    if (nextProvince) {
      setCurrentProvince(nextProvince);
    }
  };

  const handleSkip = () => {
    if (!currentProvince) return;

    const nextProvince = getRandomProvince(guessed);

    if (nextProvince) {
      setCurrentProvince(nextProvince);
    }

    setStreak(0);
    setHint("");
    clearFeedback();
  };

  const handleIslandChange = (group?: IslandGroup) => {
    setIslandGroup(group);

    const nextProvinces = group
      ? provinces.filter((province) => province.islandGroup === group)
      : provinces;

    const nextProvince =
      nextProvinces[Math.floor(Math.random() * nextProvinces.length)];

    setGuessed(new Set());
    setStreak(0);
    setHint("");
    setCurrentProvince(nextProvince);
    clearFeedback();

    setIsComplete(false);

    resetTimer();
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 pt-8 md:flex-row">
      <div className="h-[50vh] w-full shrink-0 md:h-auto md:min-w-0 md:flex-1">
        <PhilippinesMap
          islandGroup={islandGroup}
          onPlaceClick={handleClick}
          wrongPlaceId={wrongProvinceId}
          guessedPlaceIds={guessed}
        />
      </div>

      <aside className="w-full shrink-0 space-y-2 md:w-80 lg:w-96">
        <GameStatus score={guessed.size} streak={streak} time={elapsedTime} />

        <Separator />

        <div className="space-y-2">
          <p className="text-mute font-mono text-xs">Where is ...</p>

          <p className="text-ink font-serif text-4xl">
            {currentProvince?.name}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-mute h-8">
            {feedback === "correct" && (
              <span className="text-ok">Correct!</span>
            )}

            {feedback === "wrong" && (
              <span className="text-bad">Wrong — try again.</span>
            )}

            {!feedback && hint && `Hint: it's in ${hint}`}
          </p>

          <div className="flex flex-wrap gap-2">
            <Chip onClick={() => setHint(currentProvince?.islandGroup ?? "")}>
              HINT
            </Chip>

            <Chip onClick={handleSkip}>SKIP</Chip>

            <Chip onClick={() => handleIslandChange(islandGroup)}>RESTART</Chip>
          </div>
        </div>

        <Separator />

        <IslandSelector value={islandGroup} onChange={handleIslandChange} />

        <Separator />

        <div className="space-y-1">
          <ProgressBar value={guessed.size} max={playableProvinces.length} />
        </div>
      </aside>
    </main>
  );
}

export default PlayPage;
