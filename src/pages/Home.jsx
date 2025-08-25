// Import paired styles
import '../styles/pages/Home.css';
import { useState } from "react";
import "../styles/pages/Home.css";
import NavbarHome from "../components/homepage/NavbarHome.jsx";
import HeroSection from "../components/homepage/HeroSection.jsx";
import FeaturesSection from "../components/homepage/FeaturesSection.jsx";
import CTABanner from "../components/homepage/CTABanner.jsx";
import Testimonial from "../components/homepage/Testimonial.jsx";
import FooterHome from "../components/homepage/FooterHome.jsx";
import CourseCarousel from "../components/homepage/CourseCarousel/CourseCarousel.jsx";
import AuthModal from "../components/AuthModal.jsx";
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signup");
  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  return (
    <div className="home">
      {" "}
      <NavbarHome openModal={openModal} /> <HeroSection />{" "}
      {/* No modal triggers here */} <FeaturesSection /> <CourseCarousel />{" "}
      <CTABanner /> <Testimonial /> <FooterHome />{" "}
      <AuthModal
        isOpen={modalOpen}
        type={modalType}
        onClose={closeModal}
        onSuccess={(user) => console.log("Signed in:", user)}
      />{" "}
    </div>
  );
}
