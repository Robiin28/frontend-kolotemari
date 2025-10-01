import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const HomePage2 = () => {
  const bgColor = useColorModeValue("gray.900", "gray.50");
  const textColor = useColorModeValue("white", "gray.900");
  const cardBgLight = useColorModeValue("white", "gray.700");
  const cardBgYellow = useColorModeValue("yellow.50", "yellow.100");

  return (
    <Box bg={bgColor} minH="100vh" px={{ base: 6, md: 12 }} py={{ base: 8, md: 16 }} color={textColor}>
      <Flex direction="column" align="center" maxW="7xl" mx="auto" mb={16} textAlign="center">
        <Heading fontWeight="bold" fontSize={{ base: "3xl", md: "4xl" }} mb={3}>
          Navigate with Confidence
        </Heading>
        <Text maxW="2xl" fontSize={{ base: "md", md: "lg" }} opacity={0.7} mb={8}>
          Lorem ipsum dolor sit amet consectetur. Scelerisque id sed proin bibendum sit ultricies mauris integer massa euismod enim erat.
        </Text>

        <InputGroup maxW="lg" size="md" boxShadow="lg" borderRadius="full" bg={cardBgLight} mb={12}>
          <Input
            type="email"
            placeholder="Email address"
            borderRadius="full"
            bg={cardBgLight}
            px={6}
          />
          <InputRightElement width="6.5rem" pr={2}>
            <Button
              size="sm"
              colorScheme="blackAlpha"
              borderRadius="full"
              fontWeight="bold"
              boxShadow="md"
            >
              Request demo
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Flex
        maxW="7xl"
        mx="auto"
        justify="center"
        align="flex-end"
        gap={6}
        width="85%"
      >
        {/* Card 1 - longest */}
        <Box
          w="28%"
          bg={cardBgLight}
          borderRadius="xl"
          boxShadow="2xl"
          overflow="hidden"
          height="380px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box p={6}>
            <Heading fontSize="xl" fontWeight="800" mb={6} color="gray.800">
              Dashboard Explained
            </Heading>
            <Button
              size="sm"
              variant="solid"
              colorScheme="gray"
              fontWeight="bold"
              borderRadius="3xl"
            >
              Watch how it works
            </Button>
          </Box>
          <Image
            src="/image/students.png"
            alt="Students"
            objectFit="cover"
            width="100%"
            height="200px"
            borderBottomLeftRadius="xl"
            borderBottomRightRadius="xl"
          />
        </Box>

        {/* Card 2 - smaller */}
        <Box
          w="17%"
          bg={cardBgLight}
          borderRadius="xl"
          boxShadow="2xl"
          p={6}
          height="280px"
          color="gray.800"
        >
          <Heading fontSize="xl" fontWeight="700" mb={5}>
            Transactions
          </Heading>
          <Flex justify="space-between" mb={3}>
            <Text fontWeight="semibold">Reddit</Text>
            <Text>- $6</Text>
          </Flex>
          <Flex justify="space-between">
            <Text fontWeight="semibold">Spotify</Text>
            <Text>- $6</Text>
          </Flex>
        </Box>

        {/* Card 3 - smaller */}
        <Box
          w="17%"
          bg={cardBgYellow}
          borderRadius="xl"
          p={6}
          height="280px"
          boxShadow="2xl"
          color="gray.800"
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Heading fontSize="xl" fontWeight="700">
              Outflows by
            </Heading>
            <Select size="sm" maxW="120px" defaultValue="Category" borderRadius="md">
              <option>Category</option>
              <option>Type</option>
            </Select>
          </Flex>
          <Heading fontSize="2xl" fontWeight="bold" mb={4}>
            $600.00
          </Heading>
          <Text mb={1}>62% other outcome</Text>
          <Text mb={1}>20% marketing</Text>
          <Text>16% subscription</Text>
        </Box>

        {/* Card 4 - longest */}
        <Box
          w="28%"
          bg={cardBgLight}
          borderRadius="xl"
          p={6}
          height="380px"
          boxShadow="2xl"
          color="gray.800"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex justify="space-between" align="center" w="100%" mb={4}>
            <Heading fontSize="xl" fontWeight="700">
              Inflows by
            </Heading>
            <Select size="sm" maxW="120px" defaultValue="Category" borderRadius="md" />
          </Flex>
          <Heading fontSize="3xl" fontWeight="bold" mb={6}>
            $200.00
          </Heading>
          <Box
            borderRadius="full"
            bg="blue.400"
            color="white"
            w="120px"
            h="120px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
            fontSize="md"
            boxShadow="xl"
            userSelect="none"
          >
            Chart
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
