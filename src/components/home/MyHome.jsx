import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomePage1 } from "./HomePage1";
import { HomePage2 } from "./HomePage2";
import { IconButton, Box } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const MyHome = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Only render motion after mount to avoid controls.start() error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect screen size safely
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-switch pages only for large screens
  useEffect(() => {
    if (isSmallScreen) return;
    const intervalId = setInterval(() => {
      setCurrentPage((prev) => (prev === 1 ? 2 : 1));
    }, 8000);
    return () => clearInterval(intervalId);
  }, [isSmallScreen]);

  // Detect if home section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const handleNext = () => setCurrentPage(2);
  const handlePrev = () => setCurrentPage(1);

  const arrowTop = "50%";
  const arrowStyle = {
    position: "absolute",
    top: arrowTop,
    transform: "translateY(-50%)",
    zIndex: 20,
    bg: "orange.400",
    color: "white",
    w: "50px",
    h: "50px",
    borderRadius: "full",
    boxShadow: "lg",
    _hover: { bg: "orange.500", transform: "translateY(-50%) scale(1.1)" },
  };

  if (!mounted) return null;

  return (
    <Box ref={containerRef} position="relative" overflow="hidden">
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page1"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.8 }}
          >
            <HomePage1 />
          </motion.div>
        )}
        {currentPage === 2 && (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.8 }}
          >
            <HomePage2 />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small screen arrows */}
      {isSmallScreen && isVisible && (
        <>
          {currentPage === 1 && (
            <IconButton
              icon={<FaArrowRight />}
              aria-label="Next"
              onClick={handleNext}
              {...arrowStyle}
              right="10px"
            />
          )}
          {currentPage === 2 && (
            <IconButton
              icon={<FaArrowLeft />}
              aria-label="Previous"
              onClick={handlePrev}
              {...arrowStyle}
              left="10px"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default MyHome;
