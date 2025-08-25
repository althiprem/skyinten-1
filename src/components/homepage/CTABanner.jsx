// Import paired styles
import '../../styles/components/CTABanner.css';
import { useState } from "react";
import "../../styles/components/CTABanner.css";
import AuthModal from "../AuthModal"; // adjust path if needed

const CTABanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="ctaBanner">
      <div className="ctaBanner__container">
        <div className="ctaBanner__content">
          <h2 className="ctaBanner__headline">Start Your Surge</h2>
          <p className="ctaBanner__subtext">
            Join thousands of learners building momentum with Skyinten. Track
            progress, stay focused, and unlock your potential—starting now.
          </p>
        </div>

        {/* Keep <a> so CSS styling is unchanged */}
        <a
          href="#"
          className="ctaBanner__button"
          onClick={(e) => {
            e.preventDefault(); // stop navigation
            setIsModalOpen(true);
          }}
        >
          Create Your Account
        </a>
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
};

export default CTABanner;
