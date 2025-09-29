import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  IconButton,
  SimpleGrid,
  Spinner,
  Center,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import axiosInstance from "../../utils/AxiosInstance";
import Cookies from "js-cookie";

const CourseCard = ({ course, handleEnrollNow, handleAddToCart }) => {
  return (
    <Box
      maxW="465px"
      w="100%"
      bg="white"
      borderRadius="xl"
      boxShadow="xl"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      transition="all 0.4s ease"
      _hover={{
        transform: "translateY(-10px) scale(1.03)",
        boxShadow: "2xl",
      }}
      m={{ base: "auto", md: 0 }}
    >
      {/* Image */}
      <Box position="relative" overflow="hidden">
        <Image
          src={course.pic}
          alt={course.title}
          objectFit="cover"
          height="220px"
          width="100%"
          borderTopRadius="xl"
          transition="transform 0.4s ease"
          _hover={{ transform: "scale(1.1)" }}
        />
      </Box>

      {/* Title & Status */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.100">
        <Heading
          as="h3"
          size="md"
          mb={2}
          color="gray.800"
          fontWeight="extrabold"
          transition="color 0.3s"
          _hover={{ color: "orange.400" }}
        >
          {course.title}
        </Heading>
        <Flex justify="space-between" align="center">
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={course.status === "free" ? "green.500" : "orange.500"}
          >
            {course.status === "free" ? "Free" : `Paid - $${course.price || 0}`}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {new Date(course.createdAt).toLocaleDateString()}
          </Text>
        </Flex>
      </Box>

      {/* Description */}
      <Box
        p={6}
        flex="1"
        maxH={{ base: "250px", md: "150px" }}
        overflowY="auto"
        fontSize="sm"
        color="gray.700"
        lineHeight="1.7"
        sx={{
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#d1651b",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
        }}
      >
        <Text dangerouslySetInnerHTML={{ __html: course.description }} />
      </Box>

      {/* Actions */}
      <Flex justify="space-between" align="center" p={4} mt="auto">
        <Flex>
          <IconButton
            aria-label="Like"
            icon={<FaHeart />}
            size="md"
            colorScheme="red"
            variant="ghost"
            mr={2}
            _hover={{ bg: "red.100" }}
          />
          <IconButton
            aria-label="Share"
            icon={<FaShareAlt />}
            size="md"
            variant="ghost"
            _hover={{ bg: "gray.100" }}
          />
        </Flex>

        <Button
          variant="solid"
          colorScheme="orange"
          size="md"
          borderRadius="md"
          onClick={
            course.status === "free"
              ? () => handleEnrollNow(course)
              : () => handleAddToCart(course)
          }
          _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
        >
          {course.status === "free" ? "ENROLL NOW" : "ADD TO CART"}
        </Button>
      </Flex>
    </Box>
  );
};

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
        } catch {}
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

  // Show only 3 courses on small screens
  const displayedCourses = courses.slice(0, 3);

  return (
    <Box
      bg="#f9f9f9"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 12 }}
      maxW="100vw"
      overflowX="hidden"
    >
      <Box
        maxW="800px"
        mx="auto"
        mb={10}
        px={2}
        textAlign="center"
        animation="fadeInSlide 1s ease forwards"
        sx={{
          "@keyframes fadeInSlide": {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Heading
          as="h2"
          size="2xl"
          mb={4}
          fontWeight="extrabold"
          color="orange.400"
          letterSpacing="wide"
        >
          Discover Our Top Courses
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          maxW={{ base: "100%", md: "600px" }}
          mx="auto"
          lineHeight="tall"
        >
          Browse through our featured courses designed to enhance your skills
          and knowledge across multiple domains. Each course is created by
          experts to ensure you succeed in your learning journey.
        </Text>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 8, md: 8 }}
        maxW="1200px"
        mx="auto"
      >
        {displayedCourses.length > 0 ? (
          displayedCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              handleEnrollNow={handleEnrollNow}
              handleAddToCart={handleAddToCart}
            />
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
