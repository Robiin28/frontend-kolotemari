import React from "react";
import Heading from "../common/Heading";
import Awrapper from "./Awrapper";
import { Box } from "@chakra-ui/react";
import Snippet from "./Snippet";

const AboutCard = () => {
  return (
    <Box position="relative" overflow="hidden">
      {/* Left-side SVG background */}
      <Box
        position="absolute"
        top="0"
        left="-20%" // shift 20% off-screen
        h="100%"
        w="40vw" // double previous 20% size
        zIndex={-1}
        pointerEvents="none"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <path
            fill="#D47F46" // exact SVG color
            d="M56.1,-20.6C63.7,5.2,54.6,33.9,33.2,50.6C11.8,67.3,-21.9,72,-40,58.1C-58.1,44.2,-60.6,11.9,-51.3,-16.2C-42,-44.2,-21,-68,1.6,-68.5C24.2,-69,48.5,-46.3,56.1,-20.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </Box>

      {/* Main content */}
      <div className="containerds">
        <Snippet />
      </div>

      <section className="aboutHomes">
        <div className="containerd flexSB new">
          <div className="rights row">
            <Heading
              subtitle="LEARN ANYTHING"
              title="Benefits About Online Learning Expertise"
            />
            <div className="items">
              <div className="item flexSB">
                <div className="img">
                  <img
                    src="https://img.icons8.com/dotty/80/000000/storytelling.png"
                    alt=""
                  />
                </div>
                <div className="text">
                  <h2>Online Courses</h2>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts.
                  </p>
                </div>
              </div>
              <div className="item flexSB">
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3208/3208717.png"
                    alt="Flexible Learning"
                  />
                </div>
                <div className="text">
                  <h2>Flexible Learning</h2>
                  <p>
                    Access courses at your convenience with 24/7 availability
                    allowing you to learn at your own pace.
                  </p>
                </div>
              </div>
              <div className="item flexSB">
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1995/1995525.png"
                    alt="Expert Tutors"
                  />
                </div>
                <div className="text">
                  <h2>Expert Tutors</h2>
                  <p>
                    Enroll and learn from knowledgeable instructors providing
                    guidance and support through every learning phase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Awrapper />
    </Box>
  );
};

export default AboutCard;
