import React, { useState } from "react";
import Logo from "../Components/logo/Logo";
import NavBar from "../Components/navbar/NavBar";
import styles from "../styles/Projects.module.css";
import arrowImg from "../public/images/navImages/Arrow.png";
import Image from "next/image";
import Img1 from "../public/images/img1.png";
import Img2 from "../public/images/img2.png";

const Projects = () => {
  const [translate, setTranslate] = useState(0);
  // how many projects
  const elements = 3;
  // how long we can translate
  const last = (elements - 1) * -400;
  // the starting always zero
  const first = 0;
  // the next button clicked
  const nextButtonClicked = () => {
    if (translate !== last) {
      setTranslate(translate - 400);
    }
  };
  // the prev button clicked
  const prevButtonClicked = () => {
    if (translate !== first) {
      setTranslate(translate + 400);
    }
  };

  return (
    <div className={styles.projectsPage}>
      <NavBar />
      <Logo />
      <div className={styles.projectswraper}>
        {translate !== first && (
          <div onClick={prevButtonClicked} className={styles.prevButton}>
            <Image alt="" src={arrowImg} />
          </div>
        )}
        {translate !== last && (
          <div onClick={nextButtonClicked} className={styles.nextButton}>
            <Image alt="" src={arrowImg} />
          </div>
        )}
        <div className={styles.projects}>
          <div
            style={{ transform: `translateY(${translate}px)` }}
            className={styles.allProjects}
          >
            <div className={styles.imageWraper}>
              <Image layout="fill" src={Img1} alt="" objectFit="cover" />
            </div>
            <div className={styles.imageWraper}>
              <Image layout="fill" src={Img2} alt="" objectFit="cover" />
            </div>
            <div className={styles.imageWraper}>
              <Image layout="fill" src={Img1} alt="" objectFit="cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
