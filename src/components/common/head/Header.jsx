import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import {
  IconButton,
  useToast,
  Avatar,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  useBreakpointValue,
  Button,
  HStack,
  Flex,
  Image,
} from "@chakra-ui/react";
import axiosInstance from "../../../utils/AxiosInstance";
import Cookies from "js-cookie";
import AuthModals from "../../auth/AuthModals";

export const Header = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState("/path/to/placeholder/avatar.png");
  const toast = useToast();
  const navigate = useNavigate();

  const showToggleIcon = useBreakpointValue({ base: true, md: false });
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // Initialize layer 2 background CSS variable
    document.documentElement.style.setProperty("--app-layer2-bg", "#121212");
  }, []);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsLoggedIn(true);
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        try {
          const userData = JSON.parse(atob(tokenParts[1]));
          setUserName(userData.name || "User");
          setUserAvatar(userData.avatar || "/path/to/placeholder/avatar.png");
          fetchUserInfo(userData.id);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (click) setClick(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [click]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axiosInstance.get("auth/me");
      setUserAvatar(response.data.data.user.pic || userAvatar);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      Cookies.remove("authToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      navigate("/", { replace: true });
    } catch (err) {
      toast({
        title: "Logout failed",
        description: err.response?.data?.message || "Error during logout",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const SearchBar = () => (
    <InputGroup
      size="md"
      maxW="300px"
      mx="auto"
      opacity={{ base: 0, md: 1 }}
      transition="opacity 0.3s"
      display={{ base: "none", md: "flex" }}
    >
      <Input placeholder="Search course" borderRadius="18px" pr="30px" />
      <InputRightElement pointerEvents="none">
        <FaSearch color="gray" />
      </InputRightElement>
    </InputGroup>
  );

  // Shared style for Logo, company name, and tagline in layer 1 and sidebar
  const LogoTextGroup = () => (
    <Flex align="center" gap={3} minW="200px" boxShadow={"none"}>
      <Image boxSize="30px" src="/image/Kolo.png" alt="Logo" />
      <Box lineHeight="shorter" userSelect="none">
        <Text
          as="h1"
          fontWeight="530"  // less bold than semibold for less bold appearance
          fontSize="lg"
          m={0}
        >
          Kolo Temari
        </Text>
        <Text
          fontSize="10px"
          fontWeight="400"
          color="gray.600"
          letterSpacing="wide"
          textTransform="uppercase"
          m={0}
        >
          Online Education & Learning
        </Text>
      </Box>
    </Flex>
  );

  return (
    <>
      {/* Layer 1 - Top header fixed */}
      <Flex
        bg="white"
        h="60px"
        w="100%"
        px={4}
        align="center"
        justify="space-between"
        position="fixed"
        top={0}
        left={0}
        zIndex={1500}  // large zIndex so it stays above all content
        boxShadow="none"
      >
        <LogoTextGroup />

        <SearchBar />

        {/* Right Section */}
        <HStack spacing={4} minW="100px" justify="flex-end">
          {!isMobile && isLoggedIn && (
            <>
              <IconButton
                aria-label="Cart"
                icon={<FaShoppingCart />}
                variant="ghost"
                fontSize="lg"    // normal icon weight size, not bold
              />
              <Avatar
                name={userName}
                src={userAvatar}
                size="sm"
                cursor="pointer"
                onClick={() => navigate("/profile")}
              />
              <IconButton
                aria-label="Logout"
                icon={<FaSignOutAlt />}
                variant="ghost"
                fontSize="lg"   // normal icon size
                onClick={handleLogout}
                _hover={{ bg: "transparent" }}
              />
            </>
          )}

          {!isMobile && !isLoggedIn && <AuthModals fetchUserInfo={fetchUserInfo} />}

          {showToggleIcon && (
            <IconButton
              aria-label="Toggle Navigation"
              icon={click ? <FaTimes /> : <FaBars />}
              onClick={() => setClick(!click)}
              color="#121212"
              bg="none"
              borderRadius="md"
              size="lg"
              display={{ base: "block", md: "none" }}
              position="relative"
              zIndex="20"
            />
          )}
        </HStack>
      </Flex>

      {/* Layer 2 - Bottom layer */}
      <Flex
        bg="var(--app-layer2-bg)"
        h="80px"
        w="100%"
        px={0}
        align="center"
        justify="space-between"
        color="white"
        m={0}
        transition="background-color 0.5s ease"
        mt="60px"  // push content below fixed Layer 1 by 60px height
      >
        <Button
          bg="#be8029"
          color="white"
          height="80px"
          width={{ base: "150px", md: "auto" }}
          px={16}
          borderTopLeftRadius="0"
          borderTopRightRadius="0"
          borderBottomLeftRadius="0"
          borderBottomRightRadius="60px"
          fontWeight={{ base: "medium", md: "bold" }}
          fontSize={{ base: "sm", md: "md" }}
          lineHeight="1.2"
          _hover={{ bg: "#a96c08" }}
          m={0}
        >
          GET CERTIFICATE
        </Button>

        {/* Navigation links horizontal on md+ */}
        <HStack
          spacing={8}
          display={{ base: "none", md: "flex" }}
          fontFamily="'Courier New', Courier, monospace"
          fontWeight="300"
          px={4}
          userSelect="none"
        >
          <Link to="/" onClick={() => setClick(false)} _hover={{ textDecoration: "none", color: "orange.400" }}>
            Home
          </Link>
          <Link to="/course" onClick={() => setClick(false)} _hover={{ textDecoration: "none", color: "orange.400" }}>
            All Courses
          </Link>
          <Link
            to="/about"
            onClick={() => setClick(false)}
            borderTop={{ base: "none", sm: "2px solid", md: "none" }}
            borderColor="orange.400"
            pt={{ base: 0, sm: 1 }}
            _hover={{ textDecoration: "none", color: "orange.400" }}
          >
            About
          </Link>
          <Link to="/team" onClick={() => setClick(false)} _hover={{ textDecoration: "none", color: "orange.400" }}>
            Team
          </Link>
          <Link to="/price" onClick={() => setClick(false)} _hover={{ textDecoration: "none", color: "orange.400" }}>
            Pricing
          </Link>
          <Link
            to="/land"
            onClick={e => {
              e.preventDefault();
              setClick(false);
              navigate("/land");
            }}
            _hover={{ textDecoration: "none", color: "orange.400" }}
          >
            Learn
          </Link>
          <Link to="/contact" onClick={() => setClick(false)} _hover={{ textDecoration: "none", color: "orange.400" }}>
            Contact
          </Link>
        </HStack>
      </Flex>

      {/* Sidebar for mobile */}
      {click && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          w="60vw"
          maxW="300px"
          h="100vh"
          bg="white"
          boxShadow="md"
          zIndex="1100"
          display="flex"
          flexDirection="column"
          p={4}
        >
          {/* Sidebar Logo + Company + Tagline matching layer 1 style */}
          <LogoTextGroup />

          {/* Sidebar Links */}
          <Box flex="1" overflowY="auto">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ padding: "10px 0" }}>
                <Link to="/" onClick={() => setClick(false)}>
                  Home
                </Link>
              </li>
              <li style={{ padding: "10px 0" }}>
                <Link to="/course" onClick={() => setClick(false)}>
                  All Courses
                </Link>
              </li>
              <li style={{ padding: "10px 0" }}>
                <Link
                  borderTop="2px solid"
                  borderColor="orange.400"
                  to="/about"
                  onClick={() => setClick(false)}
                >
                  About
                </Link>
              </li>
              <li style={{ padding: "10px 0" }}>
                <Link to="/team" onClick={() => setClick(false)}>
                  Team
                </Link>
              </li>
              <li style={{ padding: "10px 0" }}>
                <Link to="/price" onClick={() => setClick(false)}>
                  Pricing
                </Link>
              </li>
              <li style={{ padding: "10px 0" }}>
                <Link
                  to="/land"
                  onClick={e => {
                    e.preventDefault();
                    setClick(false);
                    navigate("/land");
                  }}
                >
                  Learn
                </Link>
              </li>
              <li style={{ padding: "10px 0" }}>
                <Link to="/contact" onClick={() => setClick(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </Box>

          {/* Sidebar Auth buttons */}
          <Box mt="auto" pt={4} borderTop="1px solid" borderColor="gray.200" textAlign="center">
            {!isLoggedIn && (
              <Box display="flex" flexDirection="column" gap={3}>
                <Button
                  as={Link}
                  to="/signup"
                  onClick={() => setClick(false)}
                  leftIcon={<FaUserPlus />}
                  bg="orange.700"
                  color="white"
                  fontWeight="bold"
                  _hover={{ bg: "orange.800" }}
                  borderRadius="md"
                  size="md"
                  width="100%"
                >
                  Join Us
                </Button>
                <Button
                  as={Link}
                  to="/signin"
                  onClick={() => setClick(false)}
                  leftIcon={<FaSignInAlt />}
                  variant="outline"
                  borderColor="orange.700"
                  color="orange.700"
                  fontWeight="bold"
                  _hover={{ bg: "orange.700", color: "white" }}
                  borderRadius="md"
                  size="md"
                  width="100%"
                >
                  Login
                </Button>
              </Box>
            )}
            {isLoggedIn && (
              <>
                <Avatar
                  name={userName}
                  src={userAvatar}
                  size="lg"
                  mb={3}
                  cursor="pointer"
                  onClick={() => {
                    navigate("/profile");
                    setClick(false);
                  }}
                />
                <Button
                  onClick={() => {
                    handleLogout();
                    setClick(false);
                  }}
                  leftIcon={<FaSignOutAlt />}
                  variant="outline"
                  borderColor="red.600"
                  color="red.600"
                  fontWeight="bold"
                  bg="white"
                  borderRadius="md"
                  size="md"
                  width="100%"
                  _hover={{ bg: "transparent" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
