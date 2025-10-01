import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Divider,
  IconButton,
  Image,
  Flex,
  Spinner,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Wrap Chakra's ModalContent with motion for animation
const MotionModalContent = motion(ModalContent);

const SignInModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonBgColor = "#121212";
  const buttonTextColor = "#fff";
  const headerColor = "orange.600";

  const togglePassword = () => setShowPassword(!showPassword);

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const field = e.target.placeholder === "Enter your email" ? "email" : "password";
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: "" });
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setApiError("");
    try {
      const response = await axiosInstance.post(
        "auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.status === "success") {
        const { token, data } = response.data;
        if (token) {
          Cookies.set("authToken", token, {
            expires: 7,
            secure: window.location.protocol === "https:",
            sameSite: window.location.protocol === "https:" ? "None" : "Lax",
          });
          localStorage.setItem("authToken", token);
        }
        const user = data.user;
        onClose();
        if (user.role === "admin") navigate("/admin");
        else navigate("/land");
      } else {
        setApiError("Login failed. Please try again.");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <MotionModalContent
        p={6}
        boxShadow="md"
        borderRadius="md"
        borderTop="4px solid"
        borderTopColor={headerColor}
        bg="white"
        maxW="440px"
        _hover={{ boxShadow: "xl" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
      >
        <ModalHeader
            p={0} 
            mb={4}
            borderBottom="4px solid"
            borderBottomColor="orange.600"  
            bg="white">
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
              Sign in
            </Heading>
            
          </Flex>
        </ModalHeader>

        <ModalBody p={0} as="form" onSubmit={handleSubmit}>
          <Text textAlign="center" color="gray.500" mb={2}>
            Sign in to your account
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
              Sign in with Google
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
              Sign in with Github
            </Button>
          </Stack>

          <Divider mb={4} />

          <Stack spacing={3} mb={4}>
            <Input
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              bg="gray.100"
              isInvalid={!!formErrors.email}
            />
            {formErrors.email && (
              <Text color="red.500" fontSize="sm" mt={-2} mb={2}>
                {formErrors.email}
              </Text>
            )}

            <InputGroup>
              <Input
                placeholder="Confirm password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                bg="gray.100"
                isInvalid={!!formErrors.password}
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
            {formErrors.password && (
              <Text color="red.500" fontSize="sm" mt={-2} mb={2}>
                {formErrors.password}
              </Text>
            )}

            {apiError && (
              <Text color="red.500" fontSize="sm" mt={-1} mb={2} textAlign="center">
                {apiError}
              </Text>
            )}

            <Stack direction="row" align="center" justify="space-between" spacing={2}>
              <Checkbox size="sm">Remember me</Checkbox>
              <Link color="blue.500" fontSize="sm">
                Forgot Password?
              </Link>
            </Stack>

            <Button
              bg={buttonBgColor}
              color={buttonTextColor}
              _hover={{ bg: "#2a2a2a" }}
              variant="solid"
              type="submit"
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
              <Box opacity={isLoading ? 0 : 1}>Sign in</Box>
            </Button>
          </Stack>

          <Text textAlign="center" color="gray.500" fontSize="sm" mt={2}>
            Don&apos;t have an account? <Link color="blue.500">Sign Up for Free</Link>
          </Text>
        </ModalBody>
      </MotionModalContent>
    </Modal>
  );
};

export default SignInModal;
