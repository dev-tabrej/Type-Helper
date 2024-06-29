import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import Keypad from "./components/Keypad";
import Filters from "./components/Filters";
import Words from "./components/Words";
import GuideImage from "./components/GuideImage";
import ResultsModal from "./components/ResultsModal";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignUp";
import UserProfile from "./pages/ProfilePage";
import useShowToast from "./hooks/useShowToast";
import { useTimer } from "./hooks/useTimer";
import commonEnglishWords from "./hooks/commonWords"; // Import the words
import programmingKeywords from "./hooks/programmingKeywords";

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const capitalizeFirstLetter = (word) => {
  if (word.length > 0) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return word;
};

const randomCapitalize = (array, probability = 0.3) => {
  return array.map((word) => {
    if (Math.random() < probability) {
      return capitalizeFirstLetter(word);
    }
    return word;
  });
};

const App = () => {
  const [start, setStart] = useState(false);
  const [practiceType, setPracticeType] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(60);
  const [sessionWords, setSessionWords] = useState([]);
  const showToast = useShowToast();
  const [timeLeft, setTimeLeft] = useTimer(difficultyLevel, start);
  const [correctWords, setCorrectWords] = useState([]);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => {
    if (practiceType || difficultyLevel) {
      const words = getWords();
      setSessionWords(words);
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

  const getWords = () => {
    let words = [];
    if (practiceType === "common") {
      words = commonEnglishWords;
      words = randomCapitalize(words);
    } else if (practiceType === "programming") {
      words = programmingKeywords;
    }
    words = shuffleArray([...words]);
    return words;
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Flex
            direction="column"
            alignItems="center"
            minWidth="680px"
            height="100%"
          >
            {!start && !showResults && (
              <>
                <Filters
                  practiceType={practiceType}
                  setPracticeType={setPracticeType}
                  setTimeLeft={setTimeLeft}
                  setDifficultyLevel={setDifficultyLevel}
                />
                <Button
                  onClick={handleStart}
                  width="200px"
                  fontSize="larger"
                  mt={10}
                >
                  Start
                </Button>
                <GuideImage />
              </>
            )}
            {start ? (
              <>
                <Text fontSize="x-large" mt={5}>
                  Time left: {timeLeft} seconds
                </Text>
                <Words
                  words={sessionWords}
                  correctWords={correctWords}
                  setCorrectWords={setCorrectWords}
                  incorrectWords={incorrectWords}
                  setIncorrectWords={setIncorrectWords}
                  totalKeystrokes={totalKeystrokes}
                  setTotalKeystrokes={setTotalKeystrokes}
                  correctKeystrokes={correctKeystrokes}
                  setCorrectKeystrokes={setCorrectKeystrokes}
                />
                <Keypad flex={60} />
              </>
            ) : (
              showResults && (
                <ResultsModal
                  isOpen={showResults}
                  onClose={() => setShowResults(false)}
                  correctWords={correctWords}
                  incorrectWords={incorrectWords}
                  totalKeystrokes={totalKeystrokes}
                  correctKeystrokes={correctKeystrokes}
                  initialTime={difficultyLevel}
                  onRestart={handleRestart}
                />
              )
            )}
          </Flex>
        </Route>
        <Route path="/login">
          <UserLogin />
        </Route>
        <Route path="/signup">
          <UserSignup />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
