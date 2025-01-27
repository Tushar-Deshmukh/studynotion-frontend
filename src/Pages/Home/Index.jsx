import React from "react";
import HeroSection from "./HeroSection";
import Promotion from "./Promotion";
import LearningLanguage from "./LearningLanguage";
import BecomeAnInstructor from "./BecomeAnInstructor";

export default function Index() {
  return (
    <>
      <section>
        <HeroSection />
      </section>

      <section>
        <Promotion />
      </section>

      <section>
        <LearningLanguage />
      </section>

      <section>
        <BecomeAnInstructor />
      </section>
    </>
  );
}
