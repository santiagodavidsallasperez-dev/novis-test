import { useEffect, useRef, useState } from 'react';

/**
 * Cuenta regresiva en segundos. Llama a onExpire una sola vez
 * cuando el tiempo llega a cero. isRunning controla si el
 * temporizador avanza (util para pausar si hace falta a futuro).
 */
export function useCountdown(initialSeconds, onExpire, isRunning = true) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            onExpire();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, onExpire]);

  return secondsLeft;
}