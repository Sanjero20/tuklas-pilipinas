import { useEffect, useState } from "react";

export function useGameTimer(isComplete: boolean) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isComplete]);

  const resetTimer = () => {
    setElapsedTime(0);
  };

  return {
    elapsedTime,
    resetTimer,
  };
}
