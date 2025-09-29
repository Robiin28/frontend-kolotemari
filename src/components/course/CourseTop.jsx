import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  Flex,
  Heading,
  Stack,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/AxiosInstance";

export const CourseTop = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsLoggedIn(true);
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        try {
          const userData = JSON.parse(atob(tokenParts[1]));
          setUser(userData);
        } catch {
          // Ignore JSON parse errors
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          "https://backend-kolotemari-1.onrender.com/api/courses"
        );
        if (response.data?.status === "success") {
          setCourses(response.data.data.courses);
        } else {
          setError("Failed to fetch courses.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnrollNow = async (course) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login",
        description: "You need to log in first to enroll in this course.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axiosInstance.post(
        `https://backend-kolotemari-1.onrender.com/api/courses/${course._id}/enroll`,
        { courseId: course._id, userId: user.id },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast({
          title: "Enrollment Successful",
          description: "You have successfully enrolled in the course.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Enrollment Failed",
          description: response.data.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response
          ? error.response.data.message
          : "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = async (course) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login",
        description: "You need to log in first to add to cart.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axiosInstance.post(
        "https://backend-kolotemari-1.onrender.com/api/cart/my",
        {
          courseId: course._id,
          name: course.title,
          price: course.price || 0,
        },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        toast({
          title: "Success!",
          description: "Course added to cart successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to add course to cart.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response
          ? error.response.data.message
          : "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center py="20">
        <Spinner size="xl" color="orange.400" />
      </Center>
    );
  }

  if (error) {
    return (
      <Text color="red.500" fontSize="xl" textAlign="center" py="20">
        {error}
      </Text>
    );
  }

  return (
    <Box
      bg="#f9f9f9"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 12 }}
      maxW="100vw"
      overflowX="hidden"
    >
      {/* Introductory Text */}
      <Box minW="100vh" mx="auto" mb={10} px={2} textAlign="center">
        <Heading as="h2" size="xl" mb={4} fontWeight="extrabold" color="gray.800">
          Discover Our Top Rated Courses
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="600px" mx="auto" lineHeight="tall">
          Browse through featured courses designed to enhance your skills.
      </Text>
      </Box>

      {/* Courses Grid */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 6, md: 10 }}
        maxW="1400px"
        mx="auto"
      >
        {courses.length > 0 ? (
          courses.slice(0, 6).map((course, idx) => (
            <Box
              key={course._id || idx}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              p={6}
              display="flex"
              flexDirection="column"
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-10px)", boxShadow: "lg" }}
            >
              <Flex mb={4} align="center">
                <Box
                  flexShrink={0}
                  w="90px"
                  h="90px"
                  borderRadius="full"
                  overflow="hidden"
                  mr={6}
                >
                  <Image
                    src={course.pic || "https://via.placeholder.com/90"}
                    alt={course.title}
                    objectFit="cover"
                    w="full"
                    h="full"
                  />
                </Box>
                <Stack spacing={2} flex="1">
                  <Heading as="h3" size="md" color="gray.800">
                    {course.title}
                  </Heading>
                  <Flex align="center" mb={2}>
                    {[...Array(5)].map((_, i) => (
                      <Box key={i} color="#FFD700" mr={1} as="span">&#9733;</Box>
                    ))}
                    <Text ml={2} color="gray.600">(5.0)</Text>
                  </Flex>
                  <Flex align="center" mb={2}>
                    <Box
                      w="40px"
                      h="40px"
                      borderRadius="full"
                      overflow="hidden"
                      mr={3}
                    >
                     
                    </Box>
                    
                  </Flex>
                  <Text fontSize="sm" color="gray.500">
                    Duration: N/A
                  </Text>
                </Stack>
              </Flex>

              <Text
                fontSize="lg"
                fontWeight="bold"
                textAlign="center"
                mb={4}
                color="gray.700"
                flexGrow={1}
              >
                {course.status === "free" ? "Free" : `$${course.price}`}
              </Text>

              <Button
                variant="outline"
                colorScheme="orange"
                borderColor="orange.400"
                size="md"
                onClick={
                  course.status === "free"
                    ? () => handleEnrollNow(course)
                    : () => handleAddToCart(course)
                }
                _hover={{ bg: "orange.400", color: "white", borderColor: "orange.400" }}
              >
                {course.status === "free" ? "ENROLL NOW!" : "ADD TO CART"}
              </Button>
            </Box>
          ))
        ) : (
          <Text fontSize="xl" color="gray.600" textAlign="center" w="full">
            No courses available.
          </Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default CourseTop;
