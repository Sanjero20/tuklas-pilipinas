import { useEffect, useRef, useState } from "react";

type Feedback = "correct" | "wrong" | null;

function useGameFeedback() {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [wrongProvinceId, setWrongProvinceId] = useState<string | null>(null);

  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFeedback = () => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    feedbackTimeout.current = null;
    setFeedback(null);
    setWrongProvinceId(null);
  };

  const showFeedback = (type: Exclude<Feedback, null>, provinceId?: string) => {
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    setFeedback(type);
    setWrongProvinceId(provinceId ?? null);

    feedbackTimeout.current = setTimeout(() => {
      clearFeedback();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    };
  }, []);

  return {
    feedback,
    wrongProvinceId,
    showFeedback,
    clearFeedback,
  };
}

export default useGameFeedback;
