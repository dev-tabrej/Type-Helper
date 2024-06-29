import React from "react";
import { Flex, Select, Text } from "@chakra-ui/react";

function Filters({ practiceType, setPracticeType, setDifficultyLevel }) {
  return (
    <>
      <Text fontSize={"x-large"} mt={10}>
        Filters
      </Text>
      <Flex width={"70%"} justifyContent={"space-evenly"}>
        <Select
          placeholder="Type"
          value={practiceType}
          onChange={(e) => setPracticeType(e.target.value)}
          width={"250px"}
          mt={5}
          border={"2px solid white"}
          fontSize={"xl"}
        >
          <option value="programming">Programming</option>
          <option value="common">Common General</option>
        </Select>
        <Select
          placeholder="Time default 60sec"
          onChange={(e) => {
            switch (e.target.value) {
              case "1":
                setDifficultyLevel(10);
                break;
              case "2":
                setDifficultyLevel(120);
                break;
              case "3":
                setDifficultyLevel(300);
                break;
              default:
                setDifficultyLevel(60);
                break;
            }
          }}
          width={"250px"}
          mt={5}
          border={"2px solid white"}
          fontSize={"xl"}
        >
          <option value="1">1 min</option>
          <option value="2">2 min</option>
          <option value="3">5 min</option>
        </Select>
      </Flex>
    </>
  );
}

export default Filters;
