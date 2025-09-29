import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from '@chakra-ui/react';

const Title = ({ title }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 16 }}
      maxW="full"
      overflow="visible"
      bg="white"
    >
      {/* Left side polygon shape */}
      <Box
        position="absolute"
        top="50%"
        left={{ base: "-20px", md: "-40px" }}
        transform="translateY(-50%)"
        width={{ base: "80px", md: "120px" }}
        height={{ base: "80px", md: "120px" }}
        zIndex={-1}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <polygon points="100,0 0,0 20,100 100,100" fill="#d1651b" />
        </svg>
      </Box>

      {/* Breadcrumb navigation */}
      <Breadcrumb
        separator="›"
        fontSize={{ base: "xs", md: "sm" }}
        color="gray.600"
        mb={2}
        ml={{ base: 0, md: 6 }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((name, idx) => {
          const routeTo = `/${pathnames.slice(0, idx + 1).join('/')}`;
          const isLast = idx === pathnames.length - 1;
          const displayName = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <BreadcrumbItem key={routeTo} isCurrentPage={isLast}>
              {isLast ? (
                <Text fontWeight="bold" color="gray.800" fontSize={{ base: "sm", md: "md" }}>
                  {displayName}
                </Text>
              ) : (
                <BreadcrumbLink as={RouterLink} to={routeTo} fontSize={{ base: "sm", md: "md" }}>
                  {displayName}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      {/* Page Title */}
      <Heading
        size={{ base: "lg", md: "2xl" }}
        color="gray.900"
        fontWeight="bold"
        letterSpacing="-0.01em"
        maxW={{ base: "95%", md: "600px" }}
        ml={{ base: 0, md: 6 }}
      >
        {title}
      </Heading>
    </Box>
  );
};

export default Title;
