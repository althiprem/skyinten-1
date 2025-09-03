// Import paired styles
import '../../../styles/components/CourseCard.css';
// src/components/CourseCard.jsx
import { FaClock, FaSeedling, FaBookOpen, FaRocket } from "react-icons/fa";

export default function CourseCard({ title, duration, level, image }) {
  // Pick icon based on level
  const getLevelIcon = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return <FaSeedling className="courseCard__metaIcon" />;
      case "intermediate":
        return <FaBookOpen className="courseCard__metaIcon" />;
      case "advanced":
        return <FaRocket className="courseCard__metaIcon" />;
      default:
        return <FaBookOpen className="courseCard__metaIcon" />;
    }
  };

  return (
    <div className="courseCard">
      <div className="course-card__image-container">
  <img src={image} alt={title} className="course-card__image" />
</div>

      <div className="courseCard__content">
        <h4 className="courseCard__title">{title}</h4>
        <div className="courseCard__meta">
          <span className="courseCard__metaItem">
            <FaClock className="courseCard__metaIcon" /> {duration}
          </span>
          <span className="courseCard__separator">|</span>
          <span className="courseCard__metaItem">
            {getLevelIcon()} {level}
          </span>
        </div>
        <button className="courseCard__cta">Start Learning</button>
      </div>
    </div>
  );
}
