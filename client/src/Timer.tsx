import { useState, useEffect, ChangeEvent } from 'react';

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');

  return { minutes, seconds };
};

const timer = () => {
  const [time, setTime] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<string>('05');
  const [inputSeconds, setInputSeconds] = useState<string>('00');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    const { minutes, seconds } = formatTime(time);
    setInputMinutes(minutes);
    setInputSeconds(seconds);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    if (!isRunning) {
      const totalSeconds = parseInt(inputMinutes) * 60 + parseInt(inputSeconds);
      setTime(totalSeconds);
      setIsRunning(true);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'minutes' | 'seconds'
  ) => {
    const value = e.target.value;
    const isNumber = /^\d{0,2}$/;

    if (isNumber.test(value)) {
      if (type === 'minutes') {
        setInputMinutes(value);
      } else {
        setInputSeconds(value);
      }
    }
  };

  return {
    handleInputChange,
    handleStart,
    inputMinutes,
    inputSeconds,
    isRunning,
  };
};

export default timer;
