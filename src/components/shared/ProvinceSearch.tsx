import { useState } from "react";

import provincesData from "@/data/geojson/provinces.json";
import { getPlaceMetadata } from "@/utils/place";
import Input from "@/components/ui/Input";

interface Props {
  onSelect: (metadata: ReturnType<typeof getPlaceMetadata>) => void;
}

function ProvinceSearch({ onSelect }: Props) {
  const [search, setSearch] = useState("");

  const results = provincesData.features
    .filter((feature) =>
      feature.properties?.psgc_name
        ?.toLowerCase()
        .includes(search.toLowerCase()),
    )
    .slice(0, 5);

  return (
    <div className="space-y-2">
      <p className="text-mute text-sm uppercase">Search</p>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search a province..."
      />

      {search && results.length > 0 && (
        <div className="">
          {results.map((feature) => (
            <div
              key={feature.properties?.psgc_code}
              className="border-ink border-b"
            >
              <button
                onClick={() => {
                  onSelect(getPlaceMetadata(feature.properties));
                  setSearch("");
                }}
                className="hover:bg-ink/5 w-full px-2 py-2 text-left"
              >
                {feature.properties?.psgc_name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProvinceSearch;
