import React from "react";
import { Box, Button, Heading, Input, FormControl, FormLabel, VStack } from "@chakra-ui/react";

export const SignUpBox = () => {
  return (
    <Box
      position="relative"
      height="94vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundImage="url('/image/students.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      px={{ base: 4, md: 20 }}
    >
      {/* Heading on top-left for md and up, visible on small screen inside form */}
      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        top="30%"
        left="18%"
      >
        <Heading as="h1" fontSize="40px" color="white" maxW="300px" lineHeight="1.2">
          Get your Training <Box as="span" color="#eb6104">for free</Box>
        </Heading>
      </Box>

      {/* For small screens: show the note above the form */}
      <Box
        display={{ base: "block", md: "none" }}
        mb={4}
        position="relative"
        textAlign="center"
        w="full"
        px={4}
      >
        <Heading as="h1" fontSize="28px" color="white" lineHeight="1.2">
          Get your Training <Box as="span" color="#eb6104">for free</Box>
        </Heading>
      </Box>

      {/* Sign up form box */}
      <Box
        bg="white"
        p={{ base: 4, md: 8 }}
        borderRadius="md"
        boxShadow="0 6px 12px rgba(0,0,0,0.15)"
        textAlign="center"
        maxW={{ base: "400px", md: "400px" }}
        w={{ base: "100%", md: "90%" }}
        position={{ base: "static", md: "absolute" }}
        right={{ base: "auto", md: "10%" }}
      >
        {/* Small screen note shown inside form only on base */}
        <Box display={{ base: "none", md: "block" }} mb={6} />

        <Heading as="h2" fontSize={{ base: "1.6rem", md: "2rem" }} mb="20px">
          Sign Up Now
        </Heading>

        <VStack spacing={4} align="stretch">
          <FormControl isRequired position="relative">
            <Input
              placeholder=" "
              size="lg"
              borderColor="#201f1f"
              _focus={{ borderColor: "#eb6104", boxShadow: "0 0 5px rgba(235,97,4,0.5)" }}
              borderRadius="md"
              pt="24px"
              pb="10px"
            />
            <FormLabel
              position="absolute"
              left="15px"
              top="12px"
              color="#888"
              pointerEvents="none"
              _focus={{ color: "#eb6104" }}
              sx={{ transition: "0.2s ease all" }}
            >
              What's your name...
            </FormLabel>
          </FormControl>

          <FormControl isRequired position="relative">
            <Input
              placeholder=" "
              size="lg"
              borderColor="#201f1f"
              _focus={{ borderColor: "#eb6104", boxShadow: "0 0 5px rgba(235,97,4,0.5)" }}
              borderRadius="md"
              pt="24px"
              pb="10px"
            />
            <FormLabel
              position="absolute"
              left="15px"
              top="12px"
              color="#888"
              pointerEvents="none"
              _focus={{ color: "#eb6104" }}
              sx={{ transition: "0.2s ease all" }}
            >
              What's your email...
            </FormLabel>
          </FormControl>

          <FormControl isRequired position="relative">
            <Input
              placeholder=" "
              size="lg"
              borderColor="#201f1f"
              _focus={{ borderColor: "#eb6104", boxShadow: "0 0 5px rgba(235,97,4,0.5)" }}
              borderRadius="md"
              pt="24px"
              pb="10px"
            />
            <FormLabel
              position="absolute"
              left="15px"
              top="12px"
              color="#888"
              pointerEvents="none"
              _focus={{ color: "#eb6104" }}
              sx={{ transition: "0.2s ease all" }}
            >
              What's your phone...
            </FormLabel>
          </FormControl>

          <Button
            colorScheme="orange"
            size="lg"
            mt="10px"
            borderRadius="22px"
          >
            Get In!
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
