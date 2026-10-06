import { useEffect, useMemo, useRef, useState } from "react";
import type { Feature } from "geojson";

import provincesData from "@/data/geojson/provinces.json";
import type { IslandGroup } from "@/data/philippines/places";
import { getPlaceMetadata } from "@/utils/place";

import PhilippinesMap from "@/components/shared/map/PhilippinesMap";
import Chip from "@/components/ui/Chip";
import Separator from "@/components/ui/Separator";
import { formatTime } from "@/utils/time";
import ProgressBar from "@/components/ui/ProgressBar";

const provinces = provincesData.features
  .map((feature) => getPlaceMetadata(feature.properties))
  .filter((place) => place !== null);

function PlayPage() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [islandGroup, setIslandGroup] = useState<IslandGroup>();
  const [hint, setHint] = useState("");
  const [streak, setStreak] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongProvinceId, setWrongProvinceId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isComplete]);

  const clearFeedback = () => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    feedbackTimeout.current = null;
    setFeedback(null);
    setWrongProvinceId(null);
  };

  const showFeedback = (type: "correct" | "wrong", provinceId?: string) => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    setFeedback(type);
    setWrongProvinceId(provinceId ?? null);

    feedbackTimeout.current = setTimeout(() => {
      clearFeedback();
    }, 1000);
  };

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

    setElapsedTime(0);
    setIsComplete(false);
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
        <div className="grid grid-cols-3">
          <div>
            <p className="font-serif text-3xl">{guessed.size}</p>
            <p className="text-mute font-mono text-xs font-bold">SCORE</p>
          </div>

          <div>
            <p className="font-serif text-3xl">{streak}</p>
            <p className="text-mute font-mono text-xs font-bold">STREAK</p>
          </div>

          <div>
            <p className="font-serif text-3xl">{formatTime(elapsedTime)}</p>
            <p className="text-mute font-mono text-xs font-bold">TIME</p>
          </div>
        </div>

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

        <div className="space-y-1">
          <p className="text-mute text-sm uppercase">ISLAND</p>

          <div className="flex flex-wrap gap-2">
            <Chip onClick={() => handleIslandChange()} selected={!islandGroup}>
              ALL
            </Chip>

            <Chip
              onClick={() => handleIslandChange("LUZON")}
              selected={islandGroup === "LUZON"}
            >
              LUZON
            </Chip>

            <Chip
              onClick={() => handleIslandChange("VISAYAS")}
              selected={islandGroup === "VISAYAS"}
            >
              VISAYAS
            </Chip>

            <Chip
              onClick={() => handleIslandChange("MINDANAO")}
              selected={islandGroup === "MINDANAO"}
            >
              MINDANAO
            </Chip>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <ProgressBar value={guessed.size} max={playableProvinces.length} />
        </div>
      </aside>
    </main>
  );
}

export default PlayPage;
