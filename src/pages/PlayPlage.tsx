/* eslint-disable react-hooks/purity */
import { useRef, useState } from "react";

import PhilippinesMap from "@/components/shared/map/PhilippinesMap";
import Chip from "@/components/ui/Chip";
import Separator from "@/components/ui/Separator";

import provinceData from "@/data/geojson/provinces.json";
import { getPlaceMetadata } from "@/utils/place";
import type { Feature } from "geojson";

const provinces = provinceData.features
  .map((feature) => getPlaceMetadata(feature.properties))
  .filter((place) => place != null);

const getRandomProvince = (guessed: Set<string>) => {
  const available = provinces.filter((province) => !guessed.has(province.id));

  return available[Math.floor(Math.random() * available.length)];
};

function PlayPage() {
  const wrongTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongProvinceId, setWrongProvinceId] = useState("");

  const [hint, setHint] = useState("");

  const [currentProvince, setCurrentProvince] = useState(
    provinces[Math.floor(Math.random() * provinces.length)],
  );

  const handleClick = (feature: Feature) => {
    const clickedProvince = getPlaceMetadata(feature.properties);

    if (!clickedProvince || !currentProvince) return;

    if (clickedProvince.id === currentProvince.id) {
      // Correct Guess
      const nextGuessed = new Set(guessed);
      nextGuessed.add(currentProvince.id);
      setGuessed(nextGuessed);

      const nextProvince = getRandomProvince(nextGuessed);

      if (nextProvince) {
        setCurrentProvince(nextProvince);
      }
    } else {
      // Wrong Guess
      setWrongProvinceId(clickedProvince.id);

      if (wrongTimeoutRef.current) {
        clearTimeout(wrongTimeoutRef.current);
      }

      wrongTimeoutRef.current = setTimeout(() => {
        setWrongProvinceId("");
      }, 1000);
    }
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 pt-8 md:flex-row">
      {/* Map */}
      <div className="h-[50vh] w-full shrink-0 md:h-auto md:min-w-0 md:flex-1">
        <PhilippinesMap
          onPlaceClick={handleClick}
          guessedPlaceIds={guessed}
          wrongPlaceId={wrongProvinceId}
        />
      </div>

      <aside className="w-full shrink-0 space-y-2 md:w-80 lg:w-96">
        {/* STATS */}
        <div className="grid grid-cols-3">
          <div className="">
            <p className="font-serif text-3xl">0</p>
            <p className="text-mute font-mono text-xs font-bold">SCORE</p>
          </div>

          <div className="">
            <p className="font-serif text-3xl">0</p>
            <p className="text-mute font-mono text-xs font-bold">STREAK</p>
          </div>

          <div className="">
            <p className="font-serif text-3xl">00:00</p>
            <p className="text-mute font-mono text-xs font-bold">TIME</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-mute font-mono text-xs">Where is ...</p>
          <p className="text-ink font-serif text-4xl">
            {currentProvince.name}?
          </p>
        </div>

        <Separator />
        <div>
          <p className="text-mute h-8">{hint ? `Hint: its in ${hint}` : ""}</p>
          <div className="flex flex-wrap gap-2">
            <Chip onClick={() => setHint("Luzon")}>HINT</Chip>
            <Chip onClick={() => {}}>SKIP</Chip>
            <Chip onClick={() => {}}>RESTART</Chip>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-mute text-sm uppercase">Region</p>
          <div className="flex flex-wrap gap-2">
            <Chip onClick={() => {}}>ALL</Chip>
            <Chip onClick={() => {}}>LUZON</Chip>
            <Chip onClick={() => {}}>VISAYAS</Chip>
            <Chip onClick={() => {}}>MINDANAO</Chip>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-mute text-sm uppercase">Mastery 0/No. of items</p>
          {/* slider component */}
        </div>
      </aside>
    </main>
  );
}

export default PlayPage;
