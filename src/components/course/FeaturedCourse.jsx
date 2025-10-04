import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  AspectRatio,
  IconButton,
  Badge,
  Spinner,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/AxiosInstance";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();
  const [user, setUser] = useState(null);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser(userData);
      } catch {}
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get(
        "https://backend-kolotemari-1.onrender.com/api/courses",
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        setCourses(response.data.data.courses);
      } else {
        setError("Failed to fetch courses.");
      }
    } catch (error) {
      setError(`Failed to fetch courses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnrollNow = async (course) => {
    try {
      const response = await axiosInstance.post(
        `https://backend-kolotemari-1.onrender.com/api/courses/${course._id}/enroll`,
        { courseId: course._id, userId: user?.id },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast({
          title: "Enrollment Successful",
          description: "You have successfully enrolled.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Enrollment Failed",
          description: response.data.message || "Error enrolling.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data.message || "Unexpected error.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = async (course) => {
    try {
      const response = await axiosInstance.post(
        "https://backend-kolotemari-1.onrender.com/api/cart/my",
        { courseId: course._id, name: course.title, price: course.price || 0 },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast({
          title: "Success!",
          description: "Added to cart.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to add to cart.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data.message || "Unexpected error.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <Flex justify="center" align="center" height="300px">
        <Spinner size="xl" />
      </Flex>
    );

  if (error)
    return (
      <Text color="red.500" textAlign="center">
        {error}
      </Text>
    );

  if (!courses || courses.length === 0)
    return <Text textAlign="center">No courses found.</Text>;

  const handleNext = () =>
    setCurrentCourseIndex((i) => (i + 1) % courses.length);
  const handlePrev = () =>
    setCurrentCourseIndex((i) => (i - 1 + courses.length) % courses.length);

  const trailerUrl = (() => {
    const t = courses[currentCourseIndex]?.trailer || "";
    if (!t) return "";
    return t.includes("youtube") || t.includes("youtu.be")
      ? t + (t.includes("?") ? "&mute=1" : "?mute=1")
      : t;
  })();

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      p={2}
      mt={0}
      mb={6}
      width="80vw"
      maxW="1700px"
      mx="auto"
      position="relative"
      overflow="visible"
    >
      {/* Prev Button */}
      <IconButton
        aria-label="Previous Course"
        onClick={handlePrev}
        isDisabled={courses.length === 0}
        position="absolute"
        left={{ base: "-34px", md: "-80px" }}
        top="50%"
        transform="translateY(-50%)"
        size={{ base: "md", md: "lg" }}
        colorScheme="black"
        color="black"
        variant="solid"
        bg="white"
        boxShadow="0 0 8px rgba(0,0,0,0.15)"
        borderRadius="full"
        zIndex={20}
        _hover={{ bg: "orange.400", transform: "translateY(-50%) scale(1.1)" }}
        transition="all 0.2s ease-in-out"
        icon={<ChevronLeftIcon w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} />}
      />

      {/* Next Button */}
      <IconButton
        aria-label="Next Course"
        onClick={handleNext}
        isDisabled={courses.length === 0}
        position="absolute"
        right={{ base: "-34px", md: "-80px" }}
        top="50%"
        transform="translateY(-50%)"
        size={{ base: "md", md: "lg" }}
        colorScheme="black"
        color="black"
        variant="solid"
        bg="whiteAlpha.900"
        boxShadow="0 0 8px rgba(0,0,0,0.15)"
        borderRadius="full"
        zIndex={20}
        _hover={{ bg: "orange.400", transform: "translateY(-50%) scale(1.1)" }}
        transition="all 0.2s ease-in-out"
        icon={<ChevronRightIcon w={{ base: 6, md: 8 }} h={{ base: 6, md: 8 }} />}
      />

      {/* Content */}
      <Flex
        direction={isSmallScreen ? "column" : "row"}
        justify="space-between"
        align="center"
      >
        {/* Video */}
        <Box
          flex="1"
          width={isSmallScreen ? "100%" : "48%"}
          mx="auto"
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
        >
          {trailerUrl ? (
            <AspectRatio ratio={16 / 9} width="100%">
              <iframe
                title="Course Trailer"
                src={trailerUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                muted
              />
            </AspectRatio>
          ) : (
            <Box height={0} />
          )}
        </Box>

        {/* Info */}
        <Box
          flex="1"
          mt={isSmallScreen ? 6 : 0}
          ml={isSmallScreen ? 0 : 8}
          width={isSmallScreen ? "100%" : "48%"}
          textAlign={isSmallScreen ? "center" : "left"}
        >
          <Heading as="h3" size={isSmallScreen ? "sm" : "xl"} mb={6}>
            {courses[currentCourseIndex].title}
          </Heading>

          {/* ✅ On small screen: all info below title (badge, price, button) in one row */}
          {isSmallScreen ? (
            <Flex
              justify="center"
              align="center"
              gap={4}
              flexWrap="wrap"
              mt={2}
              mb={6}
            >
              <Badge
                colorScheme={
                  courses[currentCourseIndex].status === "free"
                    ? "green"
                    : "red"
                }
                p={2}
                fontWeight="bold"
                fontSize="sm"
                borderRadius="md"
              >
                {courses[currentCourseIndex].status.toUpperCase()}
              </Badge>

              <Text
                fontWeight="bold"
                fontSize="lg"
                color="orange.500"
                whiteSpace="nowrap"
              >
                {courses[currentCourseIndex].status === "free"
                  ? "FREE"
                  : `$${courses[currentCourseIndex].price}`}
              </Text>

              <Button
                colorScheme="orange"
                size="sm"
                px={4}
                onClick={
                  courses[currentCourseIndex].status === "free"
                    ? () => handleEnrollNow(courses[currentCourseIndex])
                    : () => handleAddToCart(courses[currentCourseIndex])
                }
              >
                {courses[currentCourseIndex].status === "free"
                  ? "Enroll"
                  : "Add"}
              </Button>
            </Flex>
          ) : (
            <>
              <Badge
                colorScheme={
                  courses[currentCourseIndex].status === "free"
                    ? "green"
                    : "red"
                }
                p={3}
                mb={6}
                fontWeight="bold"
                fontSize="md"
                borderRadius="md"
              >
                {courses[currentCourseIndex].status.toUpperCase()}
              </Badge>

              {/* Description (hidden on small) */}
              <Box
                fontSize="sm"
                lineHeight="short"
                color="gray.700"
                maxHeight="140px"
                overflow="hidden"
                dangerouslySetInnerHTML={{
                  __html: courses[currentCourseIndex].description,
                }}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                mb={6}
              />

              <Flex
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={4}
              >
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                  color="orange.500"
                  whiteSpace="nowrap"
                >
                  {courses[currentCourseIndex].status === "free"
                    ? "FREE"
                    : `$${courses[currentCourseIndex].price}`}
                </Text>

                <Button
                  colorScheme="orange"
                  size="lg"
                  px={12}
                  onClick={
                    courses[currentCourseIndex].status === "free"
                      ? () => handleEnrollNow(courses[currentCourseIndex])
                      : () => handleAddToCart(courses[currentCourseIndex])
                  }
                >
                  {courses[currentCourseIndex].status === "free"
                    ? "Enroll Now"
                    : "Add to Cart"}
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default FeaturedCourses;
