import type { useNameGame } from "@/hooks/useNameGame";
import Chip from "../ui/Chip";

interface Props {
  choices: ReturnType<typeof useNameGame>["choices"];
  onAnswer: (provinceId: string) => void;
}

export function NameQuestion({ choices, onAnswer }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-mute font-mono text-xs">What province is this?</p>

      <div className="grid grid-cols-2 gap-2">
        {choices.map((province) => (
          <Chip key={province.id} onClick={() => onAnswer(province.id)}>
            {province.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}
