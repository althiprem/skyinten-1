// Import paired styles
import '../../styles/components/FeaturesSection.css';
// src/components/homepage/FeaturesSection.jsx
// import "../../styles/components/FeaturesSection.css";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaTrophy,
  FaBullseye,
  FaChartLine,
  FaLayerGroup,
} from "react-icons/fa";

export default function FeaturesSection() {
  const items = [
    {
      icon: <FaGraduationCap className="featHome__icon" />,
      title: "Elite Course Tracks",
      desc: "Industry-vetted, outcome-driven, and constantly updated. No filler. Just mastery.",
    },
    {
      icon: <FaLaptopCode className="featHome__icon" />,
      title: "Real-World Projects",
      desc: "Build what companies actually care about. Every module ends with something you can ship.",
    },
    {
      icon: <FaTrophy className="featHome__icon" />,
      title: "Internships & Hackathons",
      desc: "Get matched, get ranked, get hired. We turn effort into exposure.",
    },
    {
      icon: <FaBullseye className="featHome__icon" />,
      title: "Progress Engine",
      desc: "Smart streaks, weekly check-ins, and goal tracking that actually motivates.",
    },
    {
      icon: <FaChartLine className="featHome__icon" />,
      title: "Achievement Vault",
      desc: "Certifications, wins, and milestones — all in one place, ready to impress.",
    },
    {
      icon: <FaLayerGroup className="featHome__icon" />,
      title: "Unified Dashboard",
      desc: "Courses, goals, internships, and stats — one clean, customizable control panel.",
    },
  ];

  return (
    <section id="features" className="featHome">
      <div className="featHome__container">
        <h3 className="featHome__title">Why Top Learners Choose Us</h3>
        <div className="featHome__grid">
          {items.map((f) => (
            <div key={f.title} className="featHome__card">
              {f.icon}
              <h4 className="featHome__cardTitle">{f.title}</h4>
              <p className="featHome__cardDesc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
