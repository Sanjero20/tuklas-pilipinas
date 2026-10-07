import confetti from "canvas-confetti";

import { useSearchParams } from "wouter";
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
import { useNameGame } from "@/hooks/useNameGame";
import { LocateQuestion } from "@/components/play/LocateQuestion";
import { NameQuestion } from "@/components/play/NameQuestion";

type GameMode = "locate" | "name";

function PlayPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const gameMode: GameMode =
    searchParams.get("mode") === "name" ? "name" : "locate";

  const { feedback, wrongProvinceId, showFeedback, clearFeedback } =
    useGameFeedback();

  const locateGame = useLocateGame({
    showFeedback,
    clearFeedback,
  });

  const nameGame = useNameGame({
    showFeedback,
    clearFeedback,
  });

  const activeGame = gameMode === "locate" ? locateGame : nameGame;

  const {
    islandGroup,
    currentProvince,
    playableProvinces,
    guessed,
    streak,
    isComplete,
    handleSkip,
    handleIslandChange: changeIsland,
  } = activeGame;

  const { elapsedTime, resetTimer } = useGameTimer(isComplete);

  const handleModeChange = (mode: GameMode) => {
    if (mode === gameMode) return;

    setSearchParams({ mode });

    locateGame.resetGame();
    nameGame.resetGame();

    resetTimer();
    clearFeedback();
  };

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
    <main className="flex min-h-0 flex-1 flex-col gap-4 pt-4">
      {/* Game mode selector */}
      <div className="flex gap-2">
        <Chip
          selected={gameMode === "locate"}
          onClick={() => handleModeChange("locate")}
        >
          LOCATE
        </Chip>

        <Chip
          selected={gameMode === "name"}
          onClick={() => handleModeChange("name")}
        >
          NAME IT
        </Chip>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
        <div className="h-[50vh] w-full shrink-0 md:h-auto md:min-w-0 md:flex-1">
          <PhilippinesMap
            islandGroup={islandGroup}
            highlightedPlaceId={
              gameMode === "name" ? currentProvince?.id : undefined
            }
            onPlaceClick={
              gameMode === "locate" ? locateGame.handleClick : undefined
            }
            wrongPlaceId={wrongProvinceId}
            guessedPlaceIds={guessed}
          />
        </div>

        <aside className="w-full shrink-0 space-y-2 md:w-80 lg:w-96">
          <GameStatus score={guessed.size} streak={streak} time={elapsedTime} />

          <Separator />

          {gameMode === "locate" ? (
            <LocateQuestion provinceName={currentProvince?.name} />
          ) : (
            <NameQuestion
              choices={nameGame.choices}
              onAnswer={nameGame.handleAnswer}
            />
          )}

          <Separator />

          <div>
            <p className="text-mute h-8">
              {feedback === "correct" && (
                <span className="text-ok">Correct!</span>
              )}

              {feedback === "wrong" && (
                <span className="text-bad">Wrong — try again.</span>
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              <Chip onClick={handleSkip}>SKIP</Chip>

              <Chip onClick={() => handleIslandChange(islandGroup)}>
                RESTART
              </Chip>
            </div>
          </div>

          <Separator />

          <IslandSelector value={islandGroup} onChange={handleIslandChange} />

          <Separator />

          <ProgressBar value={guessed.size} max={playableProvinces.length} />
        </aside>
      </div>
    </main>
  );
}

export default PlayPage;
