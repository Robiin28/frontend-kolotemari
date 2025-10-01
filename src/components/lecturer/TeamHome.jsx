import React from 'react';
import { TeamCardHome } from './TeamCardHome';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export const TeamHome = () => {
  return (
    <Box
      as="section"
      bg="white"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 0 }}
      textAlign="center"
    >
      {/* Section heading */}
      <VStack spacing={4} mb={12} maxW="700px" mx="auto">
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="extrabold"
          color="#a32622"
          fontFamily="'Exo', sans-serif"
        >
          Professional Staff
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="gray.600"
          lineHeight="1.8"
          fontFamily="'Exo', sans-serif"
        >
          A wonderful serenity has taken possession of my entire soul, like these sweet mornings
          of spring which I enjoy with my whole heart.
        </Text>
      </VStack>

      {/* Marquee / Team cards */}
      <Box maxW="100%" mx="auto">
        <TeamCardHome />
      </Box>
    </Box>
  );
};

export default TeamHome;
