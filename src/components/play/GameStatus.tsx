import { formatTime } from "@/utils/time";

interface Props {
  score: number;
  streak: number;
  time: number;
}

function GameStatus({ score, streak, time }: Props) {
  return (
    <div className="grid grid-cols-3">
      <div>
        <p className="font-serif text-3xl">{score}</p>
        <p className="text-mute font-mono text-xs font-bold">SCORE</p>
      </div>

      <div>
        <p className="font-serif text-3xl">{streak}</p>
        <p className="text-mute font-mono text-xs font-bold">STREAK</p>
      </div>

      <div>
        <p className="font-serif text-3xl">{formatTime(time)}</p>
        <p className="text-mute font-mono text-xs font-bold">TIME</p>
      </div>
    </div>
  );
}

export default GameStatus;
