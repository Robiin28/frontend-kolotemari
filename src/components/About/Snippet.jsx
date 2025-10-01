import React from "react";
import { Box, Flex, Heading, Text, VStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaClock,
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";

const MotionBox = motion(Box);

export const Snippet = () => {
  const contentWidth = useBreakpointValue({ base: "78vw", md: "70vw" });
  const textAlign = useBreakpointValue({ base: "center", md: "left" });
  const plValue = useBreakpointValue({ base: 0, md: 6 });

  return (
    <Flex
      maxW={contentWidth}
      mx="auto"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 8 }}
      direction={{ base: "column", md: "row" }}
      align="center"
      gap="20px"
      fontFamily="'Inter', sans-serif"
    >
      {/* Left images container */}
      <VStack
        flex="0 0 auto"
        spacing="12px"
        h="500px"
        justify="space-between"
        display={{ base: "none", md: "flex" }} // hide images on small screens
      >
        {/* Top Left Image with notch + tilt */}
        <MotionBox
          w="280px"
          h="232px"
          overflow="hidden"
          borderRadius="18px"
          clipPath="polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)"
          transform="rotate(-20deg)"
          transformOrigin="center"
          whileHover={{ scale: 1.05, rotate: -18 }}
          transition={{ type: "spring", stiffness: 150 }}
          position="relative"
        >
          <img
            src="/image/digit.jpg"
            alt="Top Left"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            draggable={false}
          />
        </MotionBox>

        {/* Bottom Left Image */}
        <MotionBox
          w="280px"
          h="232px"
          borderRadius="18px"
          overflow="hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img
            src="/image/learn.jpeg"
            alt="Bottom Left"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            draggable={false}
          />
        </MotionBox>
      </VStack>

      {/* Right large image */}
      <MotionBox
        flex="0 0 auto"
        w="320px"
        h="450px"
        borderRadius="18px"
        overflow="hidden"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 140 }}
        display={{ base: "none", md: "block" }} // hide on small screens
      >
        <img
          src="/image/about.webp"
          alt="Right Large"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          draggable={false}
        />
      </MotionBox>

      {/* Right text content */}
      <Box flex="1" maxW={{ base: "100%", md: "600px" }} pl={plValue} textAlign={textAlign}>
        <Heading
          as="h3"
          size="lg"
          mb={4}
          color="orange.400"
          fontWeight="700" // slightly bolder
        >
          Why Choose Us
        </Heading>
        <Text
          fontSize="md"
          color="gray.700"
          lineHeight="1.7"
          mb={6}
          fontWeight="400"
        >
          Learn at your own pace with expert instructors who make learning engaging
          and practical. Our platform is available 24/7 with interactive quizzes,
          projects, and full support to help you build skills that last a lifetime.
        </Text>

        <VStack spacing={4} align="stretch">
          {[{
            icon: FaChalkboardTeacher,
            title: 'Expert Instructors',
            desc: 'Learn from qualified and passionate teachers.',
          },
          {
            icon: FaClock,
            title: 'Flexible Learning',
            desc: 'Study anytime, anywhere, at your own pace.',
          },
          {
            icon: FaBookOpen,
            title: 'Interactive Materials',
            desc: 'Quizzes and projects to practice and retain knowledge.',
          },
          {
            icon: FaGraduationCap,
            title: 'Career Growth',
            desc: 'Build strong foundations and advance with confidence.',
          }].map(({ icon, title, desc }) => (
            <MotionBox
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              key={title}
              borderRight="4px solid transparent"
              _hover={{ borderRightColor: "orange.400" }}
            >
              <Flex align="center" bg="white" p={5} rounded="md" boxShadow="md">
                <Icon as={icon} boxSize={6} color="orange.400" mr={4} />
                <Box>
                  <Text fontWeight="500" fontSize="md" mb={1}>
                    {title}
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="400">
                    {desc}
                  </Text>
                </Box>
              </Flex>
            </MotionBox>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default Snippet;
