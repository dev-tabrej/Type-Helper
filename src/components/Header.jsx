import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { FaRegKeyboard } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    width="full"
    padding="2px 20px"
  >
    <Link to="/login">
      <FaRegKeyboard size="50px" style={{ cursor: "pointer" }} />
    </Link>

    <Text
      fontSize="xl"
      fontWeight="bold"
      fontFamily="Playwrite US Trad, cursive"
    >
      Type Partner
    </Text>

    <Flex justify="center" align="center" gap={2}>
      <Link to="/profile">
        <RxAvatar size="30px" style={{ cursor: "pointer" }} />
      </Link>

      <Button as={Link} to="/login" size="sm">
        Login
      </Button>
    </Flex>
  </Flex>
);

export default Header;
