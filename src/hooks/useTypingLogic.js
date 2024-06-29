import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import { useTimer } from "./useTimer";

const useTypingLogic = (difficultyLevel, practiceType) => {
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useTimer(difficultyLevel, start);

  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const showToast = useShowToast();

  const handleStart = () => {
    if (practiceType || difficultyLevel) {
      setStart(true);
      setShowResults(false);
      setCorrectWords([]);
      setIncorrectWords([]);
      setTotalKeystrokes(0);
      setCorrectKeystrokes(0);
      setTimeLeft(difficultyLevel);
    } else {
      showToast("Error", "Please select time and type of practice", "error");
    }
  };

  const handleRestart = () => {
    handleStart();
    setShowResults(false);
  };

  useEffect(() => {
    if (timeLeft === 0 && start) {
      setStart(false);
      setShowResults(true);
    }
  }, [timeLeft, start]);

  return {
    start,
    timeLeft,
    correctWords,
    incorrectWords,
    totalKeystrokes,
    correctKeystrokes,
    showResults,
    setCorrectWords,
    setIncorrectWords,
    setTotalKeystrokes,
    setCorrectKeystrokes,
    handleStart,
    handleRestart,
    setShowResults,
  };
};

export default useTypingLogic;
