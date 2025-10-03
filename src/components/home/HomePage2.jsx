import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

// Animated number component
const AnimatedNumber = ({ value, duration = 2, color }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(10, Math.floor((duration * 1000) / value));
    const interval = setInterval(() => {
      start += 1;
      if (start > value) clearInterval(interval);
      else setCount(start);
    }, stepTime);
    return () => clearInterval(interval);
  }, [value, duration]);
  return (
    <Text fontWeight="bold" fontSize="2xl" color={color}>
      {count}
      {value > 1000 ? "+" : ""}
    </Text>
  );
};

export const HomePage2 = () => {
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const MotionBox = motion(Box);
  const card2Controls = useAnimation();
  const card3Controls = useAnimation();
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const [distance, setDistance] = useState(0);

  const bgColor = useColorModeValue("gray.900", "gray.50");
  const cardBgLight = useColorModeValue("white", "gray.700");

  // Calculate horizontal distance for card swap animation
  useEffect(() => {
    if (card2Ref.current && card3Ref.current) {
      const rect2 = card2Ref.current.getBoundingClientRect();
      const rect3 = card3Ref.current.getBoundingClientRect();
      setDistance(rect3.left - rect2.left);
    }
  }, [isLargeScreen]);

  // Card swap animation for large screens
useEffect(() => {
  if (!isLargeScreen) return; // only for large screens
  if (!card2Ref.current || !card3Ref.current) return;

  let isMounted = true;

  const runAnimation = async () => {
    // wait a tick to ensure MotionBox is mounted
    await new Promise((r) => setTimeout(r, 50));

    while (isMounted && card2Ref.current && card3Ref.current) {
      try {
        await Promise.all([
          card2Controls.start({
            x: distance,
            transition: { duration: 1, ease: "easeInOut" },
          }),
          card3Controls.start({
            x: -distance,
            transition: { duration: 1, ease: "easeInOut" },
          }),
        ]);
        await new Promise((r) => setTimeout(r, 3000));
        await Promise.all([
          card2Controls.start({
            x: 0,
            transition: { duration: 1, ease: "easeInOut" },
          }),
          card3Controls.start({
            x: 0,
            transition: { duration: 1, ease: "easeInOut" },
          }),
        ]);
        await new Promise((r) => setTimeout(r, 3000));
      } catch (err) {
        // stop safely if component is unmounted
        break;
      }
    }
  };

  runAnimation();

  return () => {
    isMounted = false; // stop loop on unmount
  };
}, [distance, card2Controls, card3Controls, isLargeScreen]);


  return (
    <Box bg={bgColor} mx="auto" maxW="100vhvw" px={{ base: 4, md: 12 }} py={{ base: 6, md: 16 }}>
      {/* Hero Section */}
      <Flex direction="column" align="center" maxW="7xl" mx="auto" mb={{ base: 6, md: 16 }} textAlign="center">
        <Heading fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} mb={{ base: 2, md: 3 }} color="white">
          Learn Anytime, Anywhere 🚀
        </Heading>
        <Text maxW="2xl" fontSize={{ base: "sm", md: "lg" }} opacity={0.8} mb={{ base: 4, md: 8 }} color="white">
          Explore courses from top instructors and unlock your skills in technology, design, business, and more.
        </Text>

        {/* Search Bar */}
    
<Box position="relative" maxW={{ base: "full", md: "3xl" }} w="full">
  <Input
    type="text"
    placeholder="Search for courses..."
    borderRadius="full"
    p={{ base: 4, md: 6 }}
    h={{ base: 14, md: 16 }}
    bg="white"
    border="1px solid #ccc"
    w="full"
    _focus={{
      borderColor: "#be8029",
      boxShadow: "0 0 0 2px rgba(190,128,41,0.4)",
    }}
    pr={{ base: 32, md: 36 }} // space for button
  />
  <Button
    position="absolute"
    right={2}
    top={{base:"7", md:"8"}}
    transform="translateY(-50%)"
    h={{ base: "70%", md: "70%" }}
    px={{ base: 4, md: 6 }}
    bg="#be8029"
    color="white"
    borderRadius="2xl"
    _hover={{ bg: "#000" }}
    zIndex={2} // ensure it stays on top
    pointerEvents="auto"
  >
    Search
  </Button>
</Box>


      </Flex>

      {/* Cards Section */}
      <Flex
        maxW="7xl"
        mx="auto"
        justify="space-between"
        align={isLargeScreen ? "flex-end" : "flex-start"}
        gap={{ base: 4, md: 6 }}
        wrap={{ base: "wrap", md: "nowrap" }}
      >
        {/* Card 1 */}
        <Box
          flex={{ base: "1 1 100%", md: "1 1 22%" }}
          bg="black"
          color="white"
          borderRadius="xl"
          boxShadow="2xl"
          overflow="hidden"
          h={{ base: "280px", md: "380px" }}
          position="relative"
          p={{ base: 4, md: 6 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          mb={{ base: 4, md: 0 }}
        >
          <Text fontSize="sm" color="gray.300">
            Top Note
          </Text>
          <Heading fontSize={{ base: "sm", md: "xl" }} fontWeight="800" mb={{ base: 2, md: 6 }}>
            Featured Course: Web Development
          </Heading>
          <Image
            src="/image/real.png"
            alt="Featured course"
            objectFit="cover"
            w="100%"
            h="100%"
            position="absolute"
            top="0"
            left="0"
            zIndex="0"
            opacity={0.3}
            borderRadius="xl"
          />
          <Flex position="relative" zIndex="1" mt="auto" gap={2}>
            <Button size={{ base: "sm", md: "sm" }} bg="#be8029" color="white" borderRadius="3xl" flex="1">
              Enroll Now
            </Button>
            <Button size={{ base: "sm", md: "sm" }} bg="#be8029" color="white" borderRadius="3xl" flex="1">
              More Info
            </Button>
          </Flex>
        </Box>

        {/* Card 2 */}
        <MotionBox
          ref={card2Ref}
          flex={{ base: "1 1 100%", md: "1 1 18%" }}
          bg={cardBgLight}
          borderRadius="xl"
          boxShadow="2xl"
          p={{ base: 4, md: 6 }}
          h={{ base: "220px", md: "280px" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          animate={isLargeScreen ? card2Controls : {}}
          mb={{ base: 4, md: 0 }}
        >
          <Heading fontSize={{ base: "sm", md: "xl" }} fontWeight="700" mb={2}>
            Top Technology Learned
          </Heading>
          <Box>
            <Text fontSize="sm" mb={1} color="gray.800">
              React
            </Text>
            <AnimatedNumber value={120} color="#be8029" />
          </Box>
          <Box>
            <Text fontSize="sm" mb={1} color="gray.800">
              Node.js
            </Text>
            <AnimatedNumber value={80} color="#be8029" />
          </Box>
        </MotionBox>

        {/* Card 3 */}
        {isLargeScreen && (
          <MotionBox
            ref={card3Ref}
            flex={{ base: "1 1 100%", md: "1 1 18%" }}
            bg={cardBgLight}
            borderRadius="xl"
            boxShadow="2xl"
            p={{ base: 4, md: 6 }}
            h={{ base: "220px", md: "280px" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            animate={card3Controls}
          >
            <Heading fontSize={{ base: "sm", md: "xl" }} fontWeight="700" mb={2}>
              Top Learning Stats
            </Heading>
            <Box>
              <Text fontSize="sm" mb={1} color="gray.800">
                Total Courses Completed
              </Text>
              <AnimatedNumber value={1200} color="#be8029" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={1} color="gray.800">
                Active Learners
              </Text>
              <AnimatedNumber value={350} color="#be8029" />
            </Box>
          </MotionBox>
        )}

        {/* Card 4 */}
        <Box
          flex={{ base: "1 1 100%", md: "1 1 22%" }}
          bg={cardBgLight}
          borderRadius="xl"
          h={{ base: "300px", md: "380px" }}
          boxShadow="2xl"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p={{ base: 4, md: 6 }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            src="/image/students.png"
            alt="Learning"
            w="100%"
            h={{ base: "55%", md: "60%" }}
            objectFit="cover"
            borderRadius="xl"
            mb={4}
          />
          <Heading fontSize={{ base: "sm", md: "xl" }} fontWeight="700" mb={2}>
            Join Our Community
          </Heading>
          <Text fontSize={{ base: "xs", md: "sm" }} textAlign="center" mb={4}>
            Thousands of learners improving skills together.
          </Text>
          <Button w="full" size={{ base: "sm", md: "sm" }} bg="#be8029" color="white" borderRadius="full">
            Get Started
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
