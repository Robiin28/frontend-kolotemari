import React, { useRef } from "react";
import { MyHome } from "./MyHome";
import { About } from "../About/About";
import { CourseTop } from "../course/CourseTop";
import { TeamHome } from "../lecturer/TeamHome";
import { AddHome } from "../additional/AddHome";
import { Faq } from "./Faq";
import StudentSuccess from "./StudentSucess";


export const Home = () => {
  // Scroll container ref
  const scrollContainerRef = useRef(null);

  return (
   <div
  ref={scrollContainerRef}
>
      <MyHome />
      <About />
      <CourseTop />
      <AddHome />
      <TeamHome />
      <StudentSuccess scrollContainerRef={scrollContainerRef} />
      <Faq />
   </div>
  );
};
