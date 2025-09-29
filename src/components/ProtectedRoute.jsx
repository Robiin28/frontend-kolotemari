import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spinner, Center, useToast } from "@chakra-ui/react";
import axiosInstance from "../utils/AxiosInstance";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [authState, setAuthState] = useState({ loading: true, authenticated: false, role: null });
  const toast = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken") || null;
        if (!token) {
          setAuthState({ loading: false, authenticated: false, role: null });
          return;
        }

        const response = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.data.status === "success") {
          const role = response.data.data.user.role;
          setAuthState({ loading: false, authenticated: true, role });
        } else {
          setAuthState({ loading: false, authenticated: false, role: null });
        }
      } catch (err) {
        setAuthState({ loading: false, authenticated: false, role: null });
      }
    };

    checkAuth();
  }, []);

  // Wait until auth check finishes
  if (authState.loading) return <Center height="100vh"><Spinner size="xl" /></Center>;

  if (!authState.authenticated) {
    toast({
      title: "Authentication required",
      description: "Please log in.",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/signin" replace />;
  }

  if (requireAdmin && authState.role !== "admin") {
    toast({
      title: "Access Denied",
      description: "Admins only.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
