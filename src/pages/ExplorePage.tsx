import { useState } from "react";
import type { Feature } from "geojson";

import PhilippinesMap from "../components/ui/map/PhilippinesMap";
import { getPlaceMetadata } from "@/utils/place";

function ExplorePage() {
  const [selectedPlace, setSelectedPlace] = useState<ReturnType<
    typeof getPlaceMetadata
  > | null>(null);

  const handleClick = (feature: Feature) => {
    const metadata = getPlaceMetadata(feature.properties);

    setSelectedPlace(metadata);
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-4 pt-8 md:flex-row">
      {/* Map */}
      <div className="h-[50vh] w-full shrink-0 md:h-auto md:min-w-0 md:flex-1">
        <PhilippinesMap
          selectedPlaceId={selectedPlace?.id}
          onPlaceClick={handleClick}
        />
      </div>

      {/* Info */}
      <aside className="w-full shrink-0 space-y-2 md:w-80 lg:w-96">
        <p className="text-mute font-mono text-xs">SELECTED</p>

        <p className="text-ink font-serif text-4xl">
          {selectedPlace?.province ?? "Tap A Province"}
        </p>

        <div className="border-ink flex w-full justify-between border-b py-3">
          <p className="text-mute">REGION</p>
          <p className="text-ink font-bold">{selectedPlace?.region ?? "—"}</p>
        </div>
      </aside>
    </main>
  );
}

export default ExplorePage;
