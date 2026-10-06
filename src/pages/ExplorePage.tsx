import { useState } from "react";
import type { Feature } from "geojson";

import PhilippinesMap from "../components/shared/map/PhilippinesMap";
import { getPlaceMetadata } from "@/utils/place";
import Chip from "@/components/ui/Chip";
import type { IslandGroup } from "@/data/philippines/places";
import { REGIONS } from "@/data/philippines/regions";
import Separator from "@/components/ui/Separator";
import ProvinceSearch from "@/components/shared/ProvinceSearch";

function ExplorePage() {
  const [islandGroup, setIslandGroup] = useState<IslandGroup | "">("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<ReturnType<
    typeof getPlaceMetadata
  > | null>(null);

  const handleClick = (feature: Feature) => {
    const metadata = getPlaceMetadata(feature.properties);
    setSelectedPlace(metadata);
  };

  const handleIslandGroupChange = (group: IslandGroup | "") => {
    setIslandGroup(group);
    setSelectedRegion("");
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion((current) => (current === region ? "" : region));
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 pt-8 md:flex-row">
      {/* Map */}
      <div className="h-[50vh] w-full shrink-0 md:h-auto md:min-w-0 md:flex-1">
        <PhilippinesMap
          selectedPlaceId={selectedPlace?.id}
          selectedRegion={selectedRegion}
          islandGroup={islandGroup || undefined}
          onPlaceClick={handleClick}
        />
      </div>

      {/* Info */}
      <aside className="w-full shrink-0 space-y-2 md:w-80 lg:w-96">
        <p className="text-mute font-mono text-xs">SELECTED</p>

        <p className="text-ink font-serif text-4xl">
          {selectedPlace?.name ?? "Tap A Province"}
        </p>

        <div className="flex w-full justify-between">
          <p className="text-mute">REGION</p>
          <p className="text-ink font-bold">{selectedPlace?.region ?? "—"}</p>
        </div>

        <Separator />

        <div className="flex w-full justify-between">
          <p className="text-mute">CAPITAL</p>
          <p className="text-ink font-bold">{selectedPlace?.capital ?? "—"}</p>
        </div>

        <Separator />

        <p className="text-mute text-sm uppercase">Highlight by Region</p>

        {/* Island Selector */}
        <div className="flex flex-wrap gap-2">
          <Chip
            onClick={() => handleIslandGroupChange("")}
            selected={islandGroup === ""}
          >
            ALL
          </Chip>

          <Chip
            onClick={() => handleIslandGroupChange("LUZON")}
            selected={islandGroup === "LUZON"}
          >
            LUZON
          </Chip>

          <Chip
            onClick={() => handleIslandGroupChange("VISAYAS")}
            selected={islandGroup === "VISAYAS"}
          >
            VISAYAS
          </Chip>

          <Chip
            onClick={() => handleIslandGroupChange("MINDANAO")}
            selected={islandGroup === "MINDANAO"}
          >
            MINDANAO
          </Chip>
        </div>

        {/* Region Selector */}
        {islandGroup && (
          <div className="flex flex-wrap gap-2 pt-1">
            {REGIONS[islandGroup].map((region) => (
              <Chip
                key={region}
                onClick={() => handleRegionChange(region)}
                selected={selectedRegion === region}
              >
                {region}
              </Chip>
            ))}
          </div>
        )}

        <Separator />

        {/* Search Region */}
        <ProvinceSearch onSelect={setSelectedPlace} />

        {/* Clear */}
        {selectedPlace && (
          <div className="border-ink border-t py-2">
            <Chip onClick={() => setSelectedPlace(null)}>Clear selection</Chip>
          </div>
        )}
      </aside>
    </main>
  );
}

export default ExplorePage;
