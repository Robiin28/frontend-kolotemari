import React from "react";
import { Box, Flex, Heading, Text, VStack, Image, useBreakpointValue } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { awrapper } from "../../dummydata";

const MotionBox = motion(Box);

const AwrapperChakraClean = () => {
  const iconSize = useBreakpointValue({ base: 12, md: 16 });
  const boxHeight = useBreakpointValue({ base: "130px", md: "150px" }); // adjusted height
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box
      as="section"
      w="100%"
      py={{ base: 10, md: 16 }}
      px={{ base: 4, md: 10 }}
      position="relative"
      bgImage="url('/image/students.jpg')"
      bgSize="cover"
      bgPosition="center"
      overflow="hidden"
    >
      <Flex
        justify="center"
        flexWrap="wrap"
        gap={{ base: 6, md: 8 }}
      >
        {awrapper.map((val, idx) => (
          <MotionBox
            key={idx}
            w={{ base: "45%", sm: "45%", md: "22%" }} // 2 columns on small screens
            m="auto"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            <VStack spacing={3} h={boxHeight} textAlign="center">
              {val.cover && (
                <Image
                  src={val.cover}
                  alt=""
                  boxSize={iconSize}
                  objectFit="contain"
                  filter="brightness(0) invert(1)" // white icons
                />
              )}
              <Heading
                as="h2"
                fontSize={{ base: "md", md: "xl" }}
                color="orange.400"
                fontFamily="'Exo', sans-serif"
              >
                {val.data}
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.100"
                lineHeight={1.6}
              >
                {val.title}
              </Text>
            </VStack>
          </MotionBox>
        ))}
      </Flex>
    </Box>
  );
};

export default AwrapperChakraClean;
