import React from "react"
import Heading from "../common/Heading"
import "./about.css"

import Awrapper from "./Awrapper"

const AboutCard = () => {
  return (
    <>
     <div className="container" >
     
     <div className="about">
       
        <br/>
         <p>
      We provide a long-standing experience in online teaching and learning, led by 
      highly qualified and passionate instructors. Our goal is to empower students 
      who want to deepen their knowledge and stay ahead in their academic and 
      professional journeys.
    </p>
    <p>
      Our school operates <strong>24 hours a day, 7 days a week</strong>, giving you the flexibility 
      to learn at your own pace, anytime and anywhere. We offer full tutoring support, 
      refresher courses for those who need to strengthen their basics, and continuous 
      access to interactive materials.
    </p>
    <p>
      Learning here is not just about theory. With <strong>online quizzes, assignments, and exams</strong>, 
      you get to practice and apply what you learn, ensuring long-term retention and 
      confidence in your subject areas.
    </p>
    <p>
      Whether you are a high school student aiming to excel, a university learner 
      striving for top grades, or a professional looking to upgrade your skills, 
      our platform is designed to fit your lifestyle and goals. By joining our 
      courses, you are not just learning—you are building a future with 
      <em>knowledge, skills, and confidence</em>.
    </p>
       </div>
      </div>
      <section className='aboutHomes'>
   
        
        <div className='container flexSB'>
          <div className='rights row'>
            <Heading subtitle='LEARN ANYTHING' 
            title='Benefits About Online Learning Expertise' />
            <div className='items'>
                 
                    {/* <div className="box"> */}
                   
                 
                    {/* <div className="box"> */}
                    <div className='item flexSB'>
                          <div className='img'>
                            <img src="https://img.icons8.com/dotty/80/000000/storytelling.png" alt='' />
                          </div>
                          <div className='text'>
                            <h2>Online Courses</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                            </p>
                          </div>
                    {/* </div> */}
                  </div>
                   <div className='item flexSB'>
                          <div className='img'>
                           <img src="https://cdn-icons-png.flaticon.com/512/3208/3208717.png" alt="Flexible Learning" />
                     </div>
                          <div className='text'>
                           <h2>Flexible Learning</h2>
                               <p>Access courses at your convenience with 24/7 availability allowing you to learn at your own pace.</p>
    
                          </div>
                    {/* </div> */}
                  </div>
                   <div className="item flexSB">
    <div className="img">
      <img src="https://cdn-icons-png.flaticon.com/512/1995/1995525.png" alt="Expert Tutors" />
    </div>
    <div className="text">
      <h2>Expert Tutors</h2>
      <p>enroll and learn from knowledgeable instructors providing guidance and support through every learning phase.</p>
    </div>
  </div>
             
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}
export default AboutCard