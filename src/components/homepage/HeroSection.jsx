// Import paired styles
import '../../styles/components/HeroSection.css';
import { useState } from "react";
import "../../styles/components/HeroSection.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { GiOpenBook } from "react-icons/gi";
import AuthModal from "../AuthModal"; // adjust import path if needed

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="heroHome" aria-labelledby="heroTitle">
      <div className="heroHome__bgLayer" aria-hidden="true"></div>

      <div className="heroHome__container">
        <div className="heroHome__caption">
          <h1 id="heroTitle" className="heroHome__title">
            Learn. Build. Achieve.
          </h1>
          <p className="heroHome__subtitle">
            Track your progress, master new skills, and stay ahead in every
            challenge.
          </p>

          <div className="heroHome__actions">
            <button
              className="heroHome__btn heroHome__btn--primary"
              aria-label="Start learning now"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
              <HiArrowNarrowRight className="heroHome__btnIcon heroHome__btnIcon--end" />
            </button>
            <button
              className="heroHome__btn heroHome__btn--ghost"
              aria-label="Browse available courses"
            >
              <GiOpenBook className="heroHome__btnIcon" />
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <AuthModal
        isOpen={isModalOpen}
        type="signup"
        onClose={() => setIsModalOpen(false)}
        onSuccess={(user) => {
          console.log("Signed up:", user);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
}
