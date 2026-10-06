import { useMemo, useRef, useState } from "react";
import type { Feature } from "geojson";

import provincesData from "@/data/geojson/provinces.json";
import type { IslandGroup } from "@/data/philippines/places";
import { getPlaceMetadata } from "@/utils/place";

import PhilippinesMap from "@/components/shared/map/PhilippinesMap";
import Chip from "@/components/ui/Chip";
import Separator from "@/components/ui/Separator";

const provinces = provincesData.features
  .map((feature) => getPlaceMetadata(feature.properties))
  .filter((place) => place !== null);

function PlayPage() {
  const [islandGroup, setIslandGroup] = useState<IslandGroup | undefined>();

  const [streak, setStreak] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongProvinceId, setWrongProvinceId] = useState<string | null>(null);
  const [hint, setHint] = useState("");

  const wrongTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleClick = (feature: Feature) => {
    const clickedProvince = getPlaceMetadata(feature.properties);

    if (!clickedProvince || !currentProvince) return;

    // Wrong guess
    if (clickedProvince.id !== currentProvince.id) {
      setWrongProvinceId(clickedProvince.id);
      setStreak(0);

      if (wrongTimeout.current) {
        clearTimeout(wrongTimeout.current);
      }

      wrongTimeout.current = setTimeout(() => {
        setWrongProvinceId(null);
      }, 1000);

      return;
    }

    // Correct guess

    const nextGuessed = new Set(guessed);
    nextGuessed.add(currentProvince.id);

    setGuessed(nextGuessed);
    setStreak((prev) => prev + 1);
    setHint("");

    const nextProvince = getRandomProvince(nextGuessed);

    if (nextProvince) {
      setCurrentProvince(nextProvince);
    }
  };

  const handleIslandChange = (group?: IslandGroup) => {
    setIslandGroup(group);

    const nextProvinces = group
      ? provinces.filter((province) => province.islandGroup === group)
      : provinces;

    const nextProvince =
      nextProvinces[Math.floor(Math.random() * nextProvinces.length)];

    setGuessed(new Set());
    setWrongProvinceId(null);
    setHint("");
    setCurrentProvince(nextProvince);
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
            <p className="font-serif text-3xl">00:00</p>
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
          <p className="text-mute h-8">{hint ? `Hint: its in ${hint}` : ""}</p>

          <div className="flex flex-wrap gap-2">
            <Chip onClick={() => setHint(currentProvince?.islandGroup ?? "")}>
              HINT
            </Chip>

            <Chip onClick={() => {}}>SKIP</Chip>

            <Chip onClick={() => handleIslandChange(islandGroup)}>RESTART</Chip>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-mute text-sm uppercase">ISLAND</p>

          <div className="flex flex-wrap gap-2">
            <Chip
              onClick={() => handleIslandChange(undefined)}
              selected={islandGroup == null}
            >
              ALL
            </Chip>

            <Chip
              onClick={() => handleIslandChange("LUZON")}
              selected={islandGroup == "LUZON"}
            >
              LUZON
            </Chip>

            <Chip
              onClick={() => handleIslandChange("VISAYAS")}
              selected={islandGroup == "VISAYAS"}
            >
              VISAYAS
            </Chip>

            <Chip
              onClick={() => handleIslandChange("MINDANAO")}
              selected={islandGroup == "MINDANAO"}
            >
              MINDANAO
            </Chip>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-mute text-sm uppercase">
            Mastery {guessed.size}/{playableProvinces.length}
          </p>
        </div>
      </aside>
    </main>
  );
}

export default PlayPage;
