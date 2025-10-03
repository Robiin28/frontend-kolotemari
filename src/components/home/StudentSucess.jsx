import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Text, Image, Link, useBreakpointValue } from "@chakra-ui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const MotionFlex = motion(Flex);

const testimonialsTop = [
  {
    quote:
      "Udemy was rated the most popular online course or certification program for learning how to code according to StackOverflow’s 2023 Developer survey.",
    source: "Stack Overflow",
    responses: "37,076 responses collected",
    linkText: "View Web Development courses",
    linkHref: "#",
    isCompany: true,
  },
  {
    quote:
      "Udemy was truly a game-changer and a great guide for me as we brought Dimensional to life.",
    name: "Alvin Lim",
    role: "Technical Co-Founder, CTO at Dimensional",
    linkText: "View this iOS & Swift course",
    linkHref: "#",
  },
  {
    quote:
      "Udemy gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
    name: "William A. Wachlin",
    role: "Partner Account Manager at Amazon Web Services",
    linkText: "View this AWS course",
    linkHref: "#",
  },
  {
    quote:
      "Online education empowered me to finally pivot my career in tech and I couldn’t be more thankful.",
    name: "Sandra Lee",
    role: "Software Engineer at NextGen Tech",
    linkText: "See course details",
    linkHref: "#",
  },
  {
    quote:
      "The comprehensive content and community support played a big role in my success.",
    name: "Michael Chen",
    role: "Data Analyst at DataCorp",
    linkText: "Explore related courses",
    linkHref: "#",
  },
];

const testimonialsBottom = [
  {
    quote:
      "With Udemy Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
    name: "Ian Stevens",
    role: "Head of Capability Development, North America at Publicis Sapient",
    linkText: "Read full story",
    linkHref: "#",
  },
  {
    quote:
      "Online learning helped me gain skills that propelled my career forward and helped me achieve their goals.",
    name: "Jenny Smith",
    role: "Senior Developer at Tech Solutions",
    linkText: "Explore courses",
    linkHref: "#",
  },
  {
    quote:
      "The platform offered flexibility and engagement that helped me balance work and study seamlessly.",
    name: "Carlos Mendez",
    role: "Project Manager at InnovateX",
    linkText: "Check out latest courses",
    linkHref: "#",
  },
  {
    quote:
      "The instructors were knowledgeable and approachable, helping me every step of the way.",
    name: "Angela Davis",
    role: "UX Designer at Creative Loop",
    linkText: "View design courses",
    linkHref: "#",
  },
  {
    quote:
      "I was able to launch my startup thanks to the practical entrepreneurial courses available here.",
    name: "David Kim",
    role: "Founder of StartFast",
    linkText: "Discover entrepreneurship courses",
    linkHref: "#",
  },
];

const loopTop = [...testimonialsTop, ...testimonialsTop];
const loopBottom = [...testimonialsBottom, ...testimonialsBottom];

export default function StudentSuccess() {
  const sectionRef = useRef(null);
  const scrollY = useMotionValue(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(1);
  const speedFactor = useBreakpointValue({ base: 6, md: 4 });

  // Update section position and height on load & resize
  useEffect(() => {
    const handleResize = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      setSectionTop(rect.top + scrollTop);
      setSectionHeight(sectionRef.current.offsetHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const progress = (scrollTop - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
      scrollY.set(Math.min(Math.max(progress, 0), 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionTop, sectionHeight, scrollY]);

  const topX = useTransform(scrollY, [0, 1], ["0%", `-${50 * speedFactor}%`]);
  const bottomX = useTransform(scrollY, [0, 1], [`-${50 * speedFactor}%`, "0%"]);

  const cardHoverShadow = {
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    _hover: {
      transform: "translateY(-6px) rotateY(8deg) scale(1.05)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
      border: "1px solid #a32622",
    },
    cursor: "pointer",
  };

  return (
    <Box ref={sectionRef} bg="white" color="black" px={{ base: 4, md: 8 }} py={{ base: 8, md: 16 }}>
      <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" mb={{ base: 6, md: 12 }} textAlign="center">
        Student Testimonials
        <Text fontWeight="400" color="gray.700" fontSize={{ base: "sm", md: "md" }} textAlign="center" maxW="3xl" mx="auto" mt={2}>
          Hear directly from our students about their learning experiences, success stories, and how our courses helped them achieve their goals.
        </Text>
      </Text>

      {/* Top Layer */}
      <Box overflowX="hidden" overflowY="visible" w="100%" maxW={{ base: "full", md: "7xl" }} mx="auto" py={4}>
        <MotionFlex style={{ x: topX }} gap={6} flexWrap="nowrap">
          {loopTop.map((item, i) => (
            <Box
              key={i}
              flex={{ base: "0 0 47%", md: "0 0 28%" }}
              minH={{ base: "110px", md: "160px" }}
              bg="white"
              borderRadius="sm"
              p={4}
              boxShadow="0 2px 6px rgba(0,0,0,0.15), 0 -2px 4px rgba(0,0,0,0.08)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              {...cardHoverShadow}
            >
              <Text fontSize={{ base: "xs", md: "md" }} mb={4} fontStyle="italic" position="relative" pl={6} color="gray.800" flexGrow={1}>
                <Box as="span" position="absolute" left={0} top={0} fontSize="3xl" color="gray.300" lineHeight="1" userSelect="none">“</Box>
                {item.quote}
              </Text>
              {item.isCompany ? (
                <>
                  <Flex alignItems="center" gap={2} mb={2}>
                    <Image src="/image/real.png" alt="Company logo" boxSize={{ base: "20px", md: "24px" }} objectFit="cover" borderRadius="sm" />
                    <Text fontWeight="bold" color="gray.900" fontSize={{ base: "xs", md: "sm" }}>{item.source}</Text>
                  </Flex>
                  <Text fontSize="xs" color="gray.500" mb={2}>{item.responses}</Text>
                </>
              ) : (
                <Flex alignItems="center" gap={2} mb={2}>
                  <Image src="/image/real.png" alt={item.name} boxSize={{ base: "30px", md: "36px" }} objectFit="cover" borderRadius="full" />
                  <Box>
                    <Text fontWeight="bold" color="gray.900" fontSize={{ base: "xs", md: "sm" }}>{item.name}</Text>
                    <Text fontSize="xs" color="gray.500">{item.role}</Text>
                  </Box>
                </Flex>
              )}
              <Link href={item.linkHref} color="purple.600" fontWeight="semibold" fontSize={{ base: "xs", md: "sm" }}>{item.linkText} &gt;</Link>
            </Box>
          ))}
        </MotionFlex>
      </Box>

      {/* Bottom Layer */}
      <Box overflowX="hidden" overflowY="visible" w="100%" maxW={{ base: "full", md: "6xl" }} mx="auto" py={4}>
        <MotionFlex style={{ x: bottomX }} gap={6} flexWrap="nowrap">
          {loopBottom.map((item, i) => (
            <Box
              key={i}
              flex={{ base: "0 0 48%", md: "0 0 28%" }}
              minH={{ base: "110px", md: "160px" }}
              bg="white"
              borderRadius="sm"
              p={4}
              boxShadow="0 2px 6px rgba(0,0,0,0.15), 0 -2px 4px rgba(0,0,0,0.08)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              {...cardHoverShadow}
            >
              <Text fontSize={{ base: "xs", md: "md" }} mb={4} fontStyle="italic" position="relative" pl={6} color="gray.800" flexGrow={1}>
                <Box as="span" position="absolute" left={0} top={0} fontSize="3xl" color="gray.300" lineHeight="1" userSelect="none">“</Box>
                {item.quote}
              </Text>
              <Flex alignItems="center" gap={2} mb={2}>
                <Image src="/image/real.png" alt={item.name} boxSize={{ base: "30px", md: "36px" }} objectFit="cover" borderRadius="full" />
                <Box>
                  <Text fontWeight="bold" color="gray.900" fontSize={{ base: "xs", md: "sm" }}>{item.name}</Text>
                  <Text fontSize="xs" color="gray.500">{item.role}</Text>
                </Box>
              </Flex>
              <Link href={item.linkHref} color="purple.600" fontWeight="semibold" fontSize={{ base: "xs", md: "sm" }}>{item.linkText} &gt;</Link>
            </Box>
          ))}
        </MotionFlex>
      </Box>
    </Box>
  );
}
