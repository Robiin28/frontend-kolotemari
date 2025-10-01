import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { Box, Image, Heading, Text, Link, Icon } from "@chakra-ui/react";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import Marquee from "react-fast-marquee";

export const TeamCardHome = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axiosInstance.get(
          "https://backend-kolotemari-1.onrender.com/api/auth/users/instructor"
        );
        if (response.data && response.data.status === "success") {
          let users = response.data.data.users;

          // Duplicate instructors if less than 4
          if (users.length === 2) users = [...users, ...users];
          if (users.length === 3) users = [...users, ...users.slice(0,1)];

          setInstructors(users);
        } else {
          setError("Failed to fetch instructors.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  if (loading)
    return <Box textAlign="center" p={10}>Loading instructors...</Box>;
  if (error)
    return <Box color="red.500" textAlign="center" p={10}>Error: {error}</Box>;

  return (
    <Box bg="white" py={10} position="relative" overflow="hidden">
      <Box maxW={{ base: "80%", md: "70%" }} mx="auto" overflow="hidden" position="relative">
        {/* Marquee */}
        <Marquee
          ref={marqueeRef}
          speed={40}
          gradient={false}
          pauseOnHover={true}
        >
          {instructors.map((inst, i) => (
            <Box
              key={`${inst._id}-${i}`}
              w={{ base: "280px", md: "330px" }}
              h="380px"
              flex="0 0 auto"
              borderRadius="lg"
              boxShadow="0 6px 12px rgba(0,0,0,0.2)"
              bg="white"
              p={6}
              mx={4}
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              borderTop="6px solid #a32622"
              borderBottom="0.5px solid black"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              sx={{
                perspective: "1000px",
                "&:nth-of-type(3)": {
                  transform: "scale(1.08)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                  borderTop: "6px solid #222",
                },
              }}
              _hover={{
                transform: "translateY(-6px) rotateY(8deg) scale(1.05)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                border:"1px solid #a32622",
              
              }}
            >
              <Image
                src={inst.pic || "https://via.placeholder.com/150"}
                alt={inst.name}
                borderRadius="full"
                boxSize={{ base: "110px", md: "130px" }}
                objectFit="cover"
                mb={4}
                border="none"
              />
              <Heading
                as="h3"
                fontFamily="'Exo', sans-serif"
                fontWeight="extrabold"
                fontSize={{ base: "lg", md: "md" }}
                color="#a32622"
                mb={2}
                noOfLines={1}
              >
                {inst.name}
              </Heading>
              <Text
                fontFamily="'Exo', sans-serif"
                fontWeight="normal"
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                mb={3}
                noOfLines={3}
                textAlign="center"
                px={2} // padding left and right
                lineHeight="1.7"
              >
                {inst.bio || "Instructor"}
              </Text>
              <Box display="flex" justifyContent="center" gap={5} color="#555">
                <Link
                  href={inst.socials?.linkedin ? `https://linkedin.com/in/${inst.socials.linkedin}` : "#"}
                  isExternal
                >
                  <Icon as={FaLinkedin} boxSize={5} />
                </Link>
                <Link
                  href={inst.socials?.twitter ? `https://twitter.com/${inst.socials.twitter}` : "#"}
                  isExternal
                >
                  <Icon as={FaTwitter} boxSize={5} />
                </Link>
                <Link href={`mailto:${inst.socials?.email || ""}`} isExternal>
                  <Icon as={FaEnvelope} boxSize={5} />
                </Link>
              </Box>
            </Box>
          ))}
        </Marquee>
      </Box>

      {/* Hide scrollbars */}
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      `}</style>
    </Box>
  );
};

export default TeamCardHome;
