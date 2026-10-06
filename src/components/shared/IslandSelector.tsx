import type { IslandGroup } from "@/data/philippines/places";
import Chip from "@/components/ui/Chip";

interface IslandSelectorProps {
  value?: IslandGroup;
  onChange: (value?: IslandGroup) => void;
}

function IslandSelector({ value, onChange }: IslandSelectorProps) {
  return (
    <div className="space-y-1">
      <p className="text-mute text-sm uppercase">ISLAND</p>

      <div className="flex flex-wrap gap-2">
        <Chip onClick={() => onChange()} selected={!value}>
          ALL
        </Chip>

        <Chip onClick={() => onChange("LUZON")} selected={value === "LUZON"}>
          LUZON
        </Chip>

        <Chip
          onClick={() => onChange("VISAYAS")}
          selected={value === "VISAYAS"}
        >
          VISAYAS
        </Chip>

        <Chip
          onClick={() => onChange("MINDANAO")}
          selected={value === "MINDANAO"}
        >
          MINDANAO
        </Chip>
      </div>
    </div>
  );
}

export default IslandSelector;
