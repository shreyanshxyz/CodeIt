import React, { useEffect, useState } from "react";
import { FiRefreshCcw, FiClock } from "react-icons/fi";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (showTimer) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [showTimer]);

  return (
    <div>
      {showTimer ? (
        <div className="flex items-center gap-2 bg-black-surface px-3 py-1.5 cursor-pointer rounded border border-border-subtle hover:bg-black-hover transition-all duration-150">
          <span className="text-text-primary font-mono text-sm">
            {formatTime(time)}
          </span>
          <FiRefreshCcw
            className="text-text-tertiary hover:text-text-primary transition-colors duration-150"
            onClick={() => {
              setShowTimer(false);
              setTime(0);
            }}
          />
        </div>
      ) : (
        <button
          className="flex items-center justify-center p-1.5 h-8 w-8 hover:bg-black-surface rounded cursor-pointer transition-all duration-150"
          onClick={() => setShowTimer(true)}
          aria-label="Start timer"
        >
          <FiClock className="h-5 w-5 text-text-tertiary hover:text-text-primary" />
        </button>
      )}
    </div>
  );
};
export default Timer;
