import confetti from "canvas-confetti";
import { useEffect } from "react";
import type { IslandGroup } from "@/data/philippines/places";

import PhilippinesMap from "@/components/shared/map/PhilippinesMap";
import Chip from "@/components/ui/Chip";
import Separator from "@/components/ui/Separator";
import ProgressBar from "@/components/ui/ProgressBar";
import IslandSelector from "@/components/shared/IslandSelector";
import GameStatus from "@/components/play/GameStatus";

import { useGameTimer } from "@/hooks/useGameTimer";
import { useGameFeedback } from "@/hooks/useGameFeedback";
import { useLocateGame } from "@/hooks/useLocateGame";

function PlayPage() {
  const { feedback, wrongProvinceId, showFeedback, clearFeedback } =
    useGameFeedback();

  const {
    islandGroup,
    currentProvince,
    playableProvinces,
    guessed,
    streak,
    hint,
    isComplete,
    setHint,
    handleClick,
    handleSkip,
    handleIslandChange: changeIsland,
  } = useLocateGame({
    showFeedback,
    clearFeedback,
  });

  const { elapsedTime, resetTimer } = useGameTimer(isComplete);

  const handleIslandChange = (group?: IslandGroup) => {
    changeIsland(group);
    resetTimer();
    clearFeedback();
  };

  useEffect(() => {
    if (!isComplete) return;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, [isComplete]);

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

        <ProgressBar value={guessed.size} max={playableProvinces.length} />
      </aside>
    </main>
  );
}

export default PlayPage;
