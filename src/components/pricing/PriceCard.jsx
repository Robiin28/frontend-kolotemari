import React from "react";
import { price } from "../../dummydata";
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export const PriceCard = () => {
  const circleBg = useColorModeValue("rgba(197, 90, 18, 0.925)", "orange.400");
  const priceSpanColor = useColorModeValue("#15ee5d", "green.300");

  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      gap={8}
      maxW="1200px"
      mx="auto"
      mb="5vh"
      px={{ base: 4, md: 0 }}
    >
      {price.map((val) => (
        <Box
          key={val.name}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={6}
          textAlign="center"
          _hover={{
            transform: "translateY(-10px)",
            boxShadow: "xl",
          }}
          transition="all 0.3s ease"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Title */}
          <Heading
            as="h4"
            fontSize={{ base: "md", md: "lg" }}
            mb={2}
            fontWeight="semibold"
            color="gray.800"
          >
            {val.name}
          </Heading>

          {/* Image instead of circle */}
          <Image
            src="/image/real.png"
            alt={val.name}
            boxSize={{ base: "80px", md: "120px" }}
            objectFit="cover"
            borderRadius="full"
            my={4}
            boxShadow="md"
          />

          {/* Price */}
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color={circleBg}
            mb={3}
          >
            <Text as="span" color={priceSpanColor} mr={1}>
              $
            </Text>
            {val.price}
          </Text>

          {/* Description */}
          <Text
            color="gray.600"
            mb={6}
            fontSize={{ base: "sm", md: "md" }}
            px={2}
          >
            {val.desc}
          </Text>

          {/* Button */}
          <Button
            variant="outline"
            borderColor={circleBg}
            color={circleBg}
            borderWidth={2}
            borderRadius="md"
            px={{ base: 4, md: 6 }}
            py={3}
            cursor="pointer"
            _hover={{
              bg: circleBg,
              color: "white",
            }}
            fontSize={{ base: "sm", md: "md" }}
          >
            GET STARTED
          </Button>
        </Box>
      ))}
    </Grid>
  );
};

export default PriceCard;
