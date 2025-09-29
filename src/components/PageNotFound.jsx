import React from 'react';
import { Box, Text, Button, keyframes } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// Animation to shake emoji face
const shake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(10deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-10deg); }
`;

// Animation for blinking eyes (height change)
const blink = keyframes`
  0%, 20%, 40%, 60%, 80%, 100% { height: 20px; }
  10%, 30%, 50%, 70%, 90% { height: 5px; }
`;

// Animation for pupil opacity to disappear during blink
const pupilBlink = keyframes`
  0%, 20%, 40%, 60%, 80%, 100% { opacity: 1; }
  10%, 30%, 50%, 70%, 90% { opacity: 0; }
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box
      bg="black"
      color="#d1651b"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={6}
      textAlign="center"
      gap={4}
    >
      {/* Confused emoji face */}
      <Box
        mb={4}
        animation={`${shake} 3s ease-in-out infinite`}
        width="130px"
        height="130px"
        borderRadius="50%"
        bg="#d1651b"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="0 0 14px #e17f2f"
      >
        {/* Eyes */}
        <Box
          position="absolute"
          top="42px"
          left="35px"
          width="24px"
          height="20px"
          bg="black"
          borderRadius="50%"
          animation={`${blink} 4s infinite`}
        />
        <Box
          position="absolute"
          top="42px"
          right="35px"
          width="24px"
          height="20px"
          bg="black"
          borderRadius="50%"
          animation={`${blink} 4s infinite`}
          animationDelay="2s"
        />

        {/* Pupils */}
        <Box
          position="absolute"
          top="50px"
          left="43px"
          width="12px"
          height="12px"
          bg="#e17f2f"
          borderRadius="50%"
          animation={`${pupilBlink} 4s infinite`}
        />
        <Box
          position="absolute"
          top="50px"
          right="43px"
          width="12px"
          height="12px"
          bg="#e17f2f"
          borderRadius="50%"
          animation={`${pupilBlink} 4s infinite`}
          animationDelay="2s"
        />

        {/* Mouth - gentle smile */}
        <Box
          position="absolute"
          bottom="40px"
          left="50%"
          transform="translateX(-50%)"
          width="70px"
          height="30px"
          borderBottom="6px solid black"
          borderRadius="0 0 50px 50px"
          background="transparent"
        />
      </Box>

      <Text fontSize="5xl" fontWeight="extrabold" letterSpacing="wide" fontFamily="Poppins, sans-serif">
        404
      </Text>
      <Text fontSize="2xl" fontWeight="semibold" maxW="360px" mb={3} fontFamily="Poppins, sans-serif">
        Sorry, we couldn’t find that page.
      </Text>
      <Button
        bg="#d1651b"
        color="black"
        size="lg"
        px={12}
        fontWeight="bold"
        fontFamily="Poppins, sans-serif"
        _hover={{ bg: "#e17f2f" }}
        onClick={() => navigate('/')}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default PageNotFound;
