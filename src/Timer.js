import { useEffect } from "react";

export default function Timer({ handleDecreaseTimeFF, secondsRemaining }) {
  useEffect(function () {
    setInterval(handleDecreaseTimeFF, 1000);
  }, []);

  const minutesLeft = (secondsRemaining / 60) | 0;
  const secondsLeft = secondsRemaining % 60;
  return (
    <div className="timer">
      {minutesLeft}:{secondsLeft}
    </div>
  );
}
