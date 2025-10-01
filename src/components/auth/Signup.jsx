import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Input,
  Link,
  Image,
  Checkbox,
  Divider,
  IconButton,
  InputGroup,
  InputRightElement,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const SignupModal = ({ isOpen, onClose, onOpenSignin }) => {
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
  const [touched, setTouched] = useState({});

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.id]: true });
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) errors.username = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword) errors.confirmPassword = "Confirm your password";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const errors = validate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
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
        onClose();
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
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        p={6}
        boxShadow="md"
        borderRadius="md"
        borderTop="4px solid"
        borderTopColor={headerColor}
        bg="white"
        maxW="440px"
        _hover={{ boxShadow: "xl" }}
      >
        <ModalHeader
          display="flex"
          alignItems="center"
          gap={2}
          borderBottom="4px solid"
          borderBottomColor={headerColor}
          userSelect="none"
          bg="white"
        >
          <Image
            src="/image/Kolo.png"
            alt="Company Logo"
            boxSize="40px"
            objectFit="contain"
          />
          <Heading
            size="lg"
            color={headerColor}
            fontWeight="bold"
            flexGrow={1}
            textAlign="center"
            userSelect="none"
          >
            Sign up
          </Heading>
          <ModalCloseButton position="relative" />
        </ModalHeader>

        <ModalBody bg="white" px={6} pt={4} pb={6}>
          <Text textAlign="center" color="gray.500" mb={4}>
            Join us by creating your account
          </Text>

          <Stack spacing={3} mb={4}>
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

          <Stack spacing={2} as="form" onSubmit={handleSubmit}>
            <FormControl isInvalid={touched.username && errors.username} isRequired>
              <Input
                id="username"
                name="signup-username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                bg={touched.username && !formData.username.trim() ? "red.100" : "gray.100"}
                autoComplete="off"
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.email && errors.email} isRequired>
              <Input
                id="email"
                name="signup-email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                bg={touched.email && !formData.email.trim() ? "red.100" : "gray.100"}
                type="email"
                autoComplete="off"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.password && errors.password} isRequired>
              <InputGroup>
                <Input
                  id="password"
                  name="signup-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  bg={touched.password && !formData.password ? "red.100" : "gray.100"}
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
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.confirmPassword && errors.confirmPassword} isRequired>
              <Input
                id="confirmPassword"
                name="signup-confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                bg={
                  touched.confirmPassword &&
                  (!formData.confirmPassword || errors.confirmPassword)
                    ? "red.100"
                    : "gray.100"
                }
                autoComplete="new-password"
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>

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
              <Link color="blue.500" fontSize="sm" onClick={onOpenSignin}>
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
              mt={3}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
