import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Input,
  Link,
  Flex,
  Image,
  Checkbox,
  Divider,
  IconButton,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post(
        "https://backend-kolotemari-1.onrender.com/api/auth/signup",
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (response.data.status === "success") {
        setSuccess("Signup successful! You can now log in.");
        setError(null);
        navigate("/validate", {
          state: {
            email: formData.email,
            name: formData.username,
          },
        });
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buttonBgColor = "#121212";
  const buttonTextColor = "#fff";
  const headerColor = "orange.600";

  return (
    <Box
      bg="white"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        w="100%"
        maxW="sm"
        p={6}
        boxShadow="md"
        borderRadius="md"
        borderTop="4px solid"
        borderTopColor={headerColor}
        as="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* Hidden dummy inputs to discourage autofill */}
        <input
          type="text"
          name="fakeusernameremembered"
          autoComplete="off"
          style={{ display: "none" }}
        />
        <input
          type="password"
          name="fakepasswordremembered"
          autoComplete="off"
          style={{ display: "none" }}
        />

        <Flex mb={4} align="center" justify="flex-start" gap={2}>
          <Image
            src="/image/Kolo.png"
            alt="Company Logo"
            boxSize="40px"
            objectFit="contain"
          />
          <Heading
            size="lg"
            fontWeight="bold"
            color={headerColor}
            flexGrow={1}
            textAlign="center"
            userSelect="none"
          >
            Sign up
          </Heading>
        </Flex>

        <Text textAlign="center" color="gray.500" mb={2}>
          Join us by creating your account
        </Text>

        <Divider mb={4} />

        <Stack spacing={4} mb={4}>
          <Button
            w="100%"
            leftIcon={<FaGoogle />}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            color="black"
            _hover={{ bg: "#e6e6e6" }}
            variant="solid"
            justifyContent="center"
          >
            Sign up with Google
          </Button>
          <Button
            w="100%"
            leftIcon={<FaGithub />}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            color="black"
            _hover={{ bg: "#e6e6e6" }}
            variant="solid"
            justifyContent="center"
          >
            Sign up with Github
          </Button>
        </Stack>

        <Divider mb={4} />

        <Stack spacing={4} mb={4}>
          <Input
            id="username"
            name="signup-username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
            bg="gray.100"
            autoComplete="off"
          />

          <Input
            id="email"
            name="signup-email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            bg="gray.100"
            type="email"
            autoComplete="off"
          />

          <InputGroup>
            <Input
              id="password"
              name="signup-password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              bg="gray.100"
              autoComplete="new-password"
            />
            <InputRightElement width="3rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={togglePassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showPassword ? "Hide password" : "Show password"}
                bg="transparent"
                _hover={{ bg: "transparent" }}
              />
            </InputRightElement>
          </InputGroup>

          <Input
            id="confirmPassword"
            name="signup-confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            bg="gray.100"
            autoComplete="new-password"
          />

          {error && (
            <Text color="red.500" fontSize="sm" mt={-1} mb={2} textAlign="center">
              {error}
            </Text>
          )}

          {success && (
            <Text color="green.500" fontSize="sm" textAlign="center">
              {success}
            </Text>
          )}

          <Stack direction="row" align="center" justify="space-between" spacing={2}>
            <Checkbox size="sm">Remember me</Checkbox>
            <Link color="blue.500" fontSize="sm">
              Forgot Password?
            </Link>
          </Stack>

          <Button
            type="submit"
            bg={buttonBgColor}
            color={buttonTextColor}
            _hover={{ bg: "#2a2a2a" }}
            variant="solid"
            disabled={isLoading}
            position="relative"
            height="40px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {isLoading && (
              <Spinner
                size="sm"
                color="orange.400"
                thickness="3px"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              />
            )}
            <Box opacity={isLoading ? 0 : 1}>Sign up</Box>
          </Button>
        </Stack>

        <Text textAlign="center" color="gray.500" fontSize="sm" mt={2}>
          Already have an account? <Link color="blue.500">Sign in here</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignUpPage;
