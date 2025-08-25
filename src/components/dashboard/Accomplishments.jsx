import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaCode, FaCertificate, FaStar } from "react-icons/fa";
import "../../styles/components/accomplishments.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState({});

  useEffect(() => {
    const sampleAchievements = [
      {
        id: 1,
        title: "First Course Completion",
        description: "Successfully completed your first course.",
        category: "Learning Milestones",
        icon: <FaGraduationCap />,
      },
      {
        id: 2,
        title: "Coding Master",
        description: "Solved 50 coding challenges on the platform.",
        category: "Skill Mastery",
        icon: <FaCode />,
      },
      {
        id: 3,
        title: "React Certified",
        description: "Earned a certificate in React Mastery.",
        category: "Certifications",
        icon: <FaCertificate />,
      },
      {
        id: 4,
        title: "Five-Star Student",
        description: "Achieved a 5-star rating on your project.",
        category: "Community",
        icon: <FaStar />,
      },
      {
        id: 5,
        title: "Learning Streak (7 days)",
        description: "Maintained a 7-day consecutive learning streak.",
        category: "Learning Milestones",
        icon: <FaStar />,
      },
      {
        id: 6,
        title: "Hackathon Participant",
        description: "Participated in your first hackathon.",
        category: "Skill Mastery",
        icon: <FaCode />,
      },
    ];

    setTimeout(() => {
      setAchievements(sampleAchievements);
      setLoading(false);
    }, 1000);
  }, []);

  const grouped = achievements.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const AchievementCard = ({ icon, title, description }) => (
    <div className="achievement-card">
      <div className="achievement-card__icon">{icon}</div>
      <div className="achievement-card__info">
        <h3 className="achievement-card__title">{title}</h3>
        <p className="achievement-card__desc">{description}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="accomplishments accomplishments--loading">
        Loading achievements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="accomplishments accomplishments--error">{error}</div>
    );
  }

  return (
    <div className="accomplishments">
      <h1 className="accomplishments__header">My Achievements</h1>
      {Object.keys(grouped).length > 0 ? (
        Object.keys(grouped).map((category) => (
          <div key={category} className="accomplishments__category">
            <div
              className="accomplishments__category-header"
              onClick={() => toggleCategory(category)}
            >
              <h3>{category}</h3>
              <span
                className={`accomplishments__toggle-icon ${
                  collapsedCategories[category] ? "collapsed" : "expanded"
                }`}
              >
                +
              </span>
            </div>
            {!collapsedCategories[category] && (
              <div className="accomplishments__grid">
                {grouped[category].map((item) => (
                  <AchievementCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="accomplishments__empty">
          <p>You haven't unlocked any achievements yet. Keep learning!</p>
        </div>
      )}
    </div>
  );
};

export default Achievements;
