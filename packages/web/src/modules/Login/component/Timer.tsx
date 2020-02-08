import React, { useEffect, useState } from "react";

interface Props {
  goBack: () => void;
}

export const Timer: React.FC<Props> = ({ goBack }) => {
  let [timer, setTimer] = useState<number>(90);
  let different = 0;
  useEffect(() => {
    const authTime = localStorage.getItem("authTime");

    if (authTime) {
      different = Math.round(
        (new Date().getTime() - JSON.parse(authTime || "")) / 1000
      );
      setTimer(timer - different);
    }
  }, []);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (timer < 0) {
        goBack();
      }
      setTimer(--timer);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [goBack, timer]);
  return (
    <p className="timer-login">
      {timer > -1 &&
        (timer / 60 < 1
          ? timer < 10
            ? "00:0" + timer
            : "00:" + timer
          : "0" +
            Math.floor(timer / 60) +
            ":" +
            (timer - Math.floor(timer / 60) * 60 < 10
              ? "0" + (timer - Math.floor(timer / 60) * 60)
              : timer - Math.floor(timer / 60) * 60))}
    </p>
  );
};
