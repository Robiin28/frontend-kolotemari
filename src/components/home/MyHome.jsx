import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {HomePage1} from "./HomePage1";  // Your first home page component
import {HomePage2} from "./HomePage2";  // Your second home page component (you create this)

export const MyHome = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Example: switch pages after some interval - you can use your own trigger as well
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage((prev) => (prev === 1 ? 2 : 1));
    }, 8000); // switch every 8 seconds - change as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
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
  );
};

export default MyHome;
