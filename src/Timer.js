import { useEffect } from "react";

export default function Timer({ handleDecreaseTimeFF, secondsRemaining }) {
  useEffect(
    function () {
      const id = setInterval(handleDecreaseTimeFF, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [handleDecreaseTimeFF]
  );

  const minutesLeft = (secondsRemaining / 60) | 0;
  const secondsLeft = secondsRemaining % 60;
  return (
    <div className="timer">
      {minutesLeft}:{secondsLeft}
    </div>
  );
}
