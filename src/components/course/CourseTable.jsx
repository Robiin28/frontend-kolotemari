import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../utils/AxiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faStar,
  faStarHalfAlt,
  faClock,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import FeaturedCourses from './FeaturedCourse';

export const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const toast = useToast();
  const itemsPerPage = 9; // Show 9 courses per page

  // User info for enrollment
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState('/path/to/placeholder/avatar.png');

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          // Decoding user data if needed
          const userData = JSON.parse(atob(tokenParts[1]));
          fetchUserInfo();
        }
      } catch (err) {
        console.error('Error parsing token user data:', err);
      }
    }
    fetchCourses();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get('auth/me');
      setUser(response.data.data.user);
      setUserAvatar(response.data.data.user.pic || userAvatar);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        'https://backend-kolotemari-1.onrender.com/api/courses',
        { withCredentials: true }
      );
      if (response.data.status === 'success') {
        setCourses(response.data.data.courses || []);
        const uniqueCategories = Array.from(
          new Set(response.data.data.courses.map((c) => c.category))
        ).filter(Boolean);
        setCategories(uniqueCategories);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch courses.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Error fetching courses: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setTimeout(() => setShowLoader(false), 1500);
    }
  };

  const applyFilters = (cat = activeCategory, search = searchQuery) => {
    let filtered = courses;
    if (cat) {
      filtered = filtered.filter((c) => c.category === cat);
    }
    if (search.trim()) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCourses(filtered);
    setShowFilteredResults(true);
    setCurrentPage(0);
  };

  const handleCategorySelect = (category) => {
    if (category === activeCategory) {
      setActiveCategory('');
      setShowFilteredResults(false);
    } else {
      setActiveCategory(category);
      applyFilters(category, searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    applyFilters(activeCategory, searchQuery);
  };

  const currentCourses = showFilteredResults
    ? filteredCourses.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    : courses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNext = () => {
    if (
      currentPage <
      Math.ceil(
        (showFilteredResults ? filteredCourses.length : courses.length) /
          itemsPerPage
      ) -
        1
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const addToCart = async (course) => {
    try {
      const response = await axiosInstance.post(
        'https://backend-kolotemari-1.onrender.com/api/cart/my',
        { courseId: course._id, name: course.title, price: course.price || 0 },
        { withCredentials: true }
      );
      if (response.data.status === 'success') {
        toast({
          title: 'Success!',
          description: 'Course added to cart successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to add course to cart.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response
          ? error.response.data.message
          : 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const enrollCourse = async (course) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to enroll in courses.',
        status: 'warning',
        duration: 4000,
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
      if (response.data.status === 'success') {
        toast({
          title: 'Enrollment Successful',
          description: 'You have successfully enrolled in the course.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Enrollment Failed',
          description:
            response.data.message || 'An error occurred while enrolling.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response
          ? error.response.data.message
          : 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const wholeStars = Number.isFinite(rating) && rating > 0 ? Math.floor(rating) : 0;
    const hasHalfStar = Number.isFinite(rating) && rating % 1 >= 0.5;
    for (let i = 0; i < wholeStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color="orange" />);
    }
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon key="half" icon={faStarHalfAlt} color="orange" />
      );
    }
    return stars;
  };

  return (
    <>
      <FeaturedCourses />
      <Container maxW="container.xl" py={[4, 6]} px={[2, 4]}>
        {/* Filter bar with category buttons */}
        <Flex mb={4} wrap="wrap" gap={3} justify={['start', 'center']}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === activeCategory ? 'solid' : 'outline'}
              colorScheme="orange"
              size="sm"
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </Button>
          ))}
        </Flex>

        {/* Search bar */}
        <Flex mb={6} justify="center" align="center" gap={2} flexWrap="wrap">
          <Input
            placeholder="Search Courses"
            variant="outline"
            w={['100%', '300px']}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <IconButton
            aria-label="Search"
            icon={<FontAwesomeIcon icon={faSearch} />}
            colorScheme="blue"
            onClick={handleSearch}
            size="md"
          />
        </Flex>

        {/* Courses Grid */}
        <Grid
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={[4, 6]}
          px={[2, 0]}
        >
          {currentCourses.map((course) => (
            <Box
              key={course.id || course._id}
              position="relative"
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              _hover={{ boxShadow: 'lg' }}
              bg="white"
              display="flex"
              flexDirection="column"
              minH={[null, null, '320px']}
            >
              <Box flexShrink={0}>
                <img
                  src={course.pic}
                  alt={course.title || 'Course Image'}
                  style={{
                    width: '100%',
                    height: '130px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                  }}
                />
              </Box>
              <Box p={[3, 4]} flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                  <Text fontSize={['sm', 'md']} color="gray.700" mb={1} fontWeight="semibold" noOfLines={2}>
                    {course.title}
                  </Text>
                  <Heading size="sm" color="orange.600" mb={2} textAlign="right">
                    {course.category}
                  </Heading>
                  <Divider my={2} />
                  <Flex justify="space-between" align="center" fontSize={['xs', 'sm']} color="gray.600">
                    <Text>
                      <FontAwesomeIcon icon={faClock} /> {course.duration}
                    </Text>
                    <Text color="green.500" fontWeight="medium" textTransform="capitalize" noOfLines={1}>
                      {course.status}
                    </Text>
                  </Flex>
                </Box>
                <Text fontWeight="bold" fontSize={['sm', 'md']} color="red.400" textAlign="right" mt={3}>
                  {course.price}
                </Text>
              </Box>

              {/* Hover overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="whiteAlpha.900"
                color="blackAlpha.900"
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                opacity={0}
                transition="opacity 0.3s ease-in-out"
                _hover={{ opacity: 1 }}
                cursor="pointer"
                borderRadius="md"
                zIndex={10}
                textAlign="left"
                boxShadow="md"
              >
                <Stack spacing={3} maxH="calc(100% - 56px)" overflowY="auto">
                  <Text fontWeight="bold" fontSize={['md', 'lg']} noOfLines={2}>
                    {course.title}
                  </Text>
                  <Text fontWeight="semibold" fontSize={['sm', 'md']}>
                    Instructor: {course.instructor}
                  </Text>
                  <Flex fontSize="sm" align="center" gap={2}>
                    {renderStars(course.rating)}
                    <Text ml={2}>{course.rating ? course.rating.toFixed(1) : '0.0'}</Text>
                  </Flex>
                  <Box
                    maxH="100px"
                    overflowY="auto"
                    fontSize="sm"
                    lineHeight="short"
                    dangerouslySetInnerHTML={{
                      __html: course.description
                        ? course.description.slice(0, 150) + '...'
                        : 'No description',
                    }}
                  />
                </Stack>
                <Button
                  colorScheme="orange"
                  mt={3}
                  onClick={() => {
                    if (course.status.toLowerCase() === 'free') {
                      enrollCourse(course);
                    } else {
                      addToCart(course);
                    }
                  }}
                >
                  {course.status.toLowerCase() === 'free' ? 'Enroll Now' : 'Add to Cart'}
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Pagination controls */}
        <Flex justify="space-between" mt={6} px={[2, 0]}>
          <Button
            onClick={handlePrev}
            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            isDisabled={currentPage === 0}
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            isDisabled={
              currentPage >=
              Math.ceil(
                (showFilteredResults ? filteredCourses.length : courses.length) /
                  itemsPerPage
              ) -
                1
            }
            size="sm"
          >
            Next
          </Button>
        </Flex>
      </Container>
    </>
  );
};
