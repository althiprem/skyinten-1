import React, { useState, useEffect } from "react";
import "../../styles/components/profile.css";
import {
  FaUserCircle,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaSpinner,
  FaExclamationTriangle,
  FaPencilAlt,
} from "react-icons/fa";

// Mock profile data
const demoProfileData = {
  name: "Aarav Sharma",
  headline: "Full Stack Developer | JavaScript & Python Enthusiast",
  location: "Bengaluru, Karnataka, India",
  contact: {
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "aarav.sharma@example.com",
    phone: "+91 9876543210",
  },
  summary:
    "A passionate and results-driven full-stack developer with over 5 years of experience in designing, developing, and deploying scalable web applications. Proficient in MERN stack and Python/Django. A quick learner and a team player with a strong focus on clean code and robust architecture.",
  skills: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "Python",
    "Django",
    "CSS",
    "Git",
  ],
  workExperience: [
    {
      position: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2022 - Present",
      description:
        "Led a team of 3 developers to rebuild a legacy e-commerce platform using React and Node.js. Optimized database queries, reducing page load times by 40%.",
    },
    {
      position: "Software Developer",
      company: "Innovate Labs",
      duration: "Aug 2018 - Dec 2021",
      description:
        "Developed RESTful APIs for a mobile application, handled backend logic, and integrated third-party services. Contributed to a 20% increase in user engagement.",
    },
  ],
  education: [
    {
      degree: "Master of Technology",
      field: "Computer Science",
      university: "Indian Institute of Technology, Madras",
      year: "2018",
    },
    {
      degree: "Bachelor of Engineering",
      field: "Information Technology",
      university: "Delhi College of Engineering",
      year: "2016",
    },
  ],
};

// Reusable component for each section
const ProfileSection = ({ title, icon, onEdit, children }) => (
  <div className="profile-section">
    <h2 className="profile-section__header">
      {icon}
      <span>{title}</span>
      {onEdit && (
        <button className="edit-btn" onClick={onEdit}>
          <FaPencilAlt /> Edit
        </button>
      )}
    </h2>
    <div className="profile-section__content">{children}</div>
  </div>
);

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);

  // Individual states for editable fields
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchProfileData = () => {
      setTimeout(() => {
        try {
          setProfileData(demoProfileData);
          setSummary(demoProfileData.summary);
          setSkills(demoProfileData.skills);
          setWorkExperience(demoProfileData.workExperience);
          setEducation(demoProfileData.education);
        } catch (err) {
          setError("Failed to fetch profile data.");
        } finally {
          setLoading(false);
        }
      }, 1500); // 1.5-second delay to mimic network latency
    };

    fetchProfileData();
  }, []);

  const handleEdit = (sectionName) => {
    setEditingSection(sectionName);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    // For this demo, we'll just log the updated data
    console.log("Saving changes:", {
      summary,
      skills,
      workExperience,
      education,
    });
    setEditingSection(null); // Exit edit mode
  };

  const handleCancel = () => {
    // Reset local state to the last saved data
    setSummary(profileData.summary);
    setSkills(profileData.skills);
    setWorkExperience(profileData.workExperience);
    setEducation(profileData.education);
    setEditingSection(null); // Exit edit mode
  };

  if (loading) {
    return (
      <div className="status-message">
        <FaSpinner className="spinner" />
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        <FaExclamationTriangle className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header__avatar">
          <img src={profileData.contact.avatar} alt="User Avatar" />
        </div>
        <div className="profile-header__info">
          <h1 className="profile-header__name">{profileData.name}</h1>
          <p className="profile-header__headline">{profileData.headline}</p>
          <p className="profile-header__location">{profileData.location}</p>
        </div>
      </div>

      <div className="profile-main">
        {/* Contact Information Section (Read-only) */}
        <ProfileSection
          title="Contact Information"
          icon={<FaUserCircle className="section-icon" />}
        >
          <div className="contact-info">
            <p>Email: {profileData.contact.email}</p>
            <p>Phone: {profileData.contact.phone}</p>
          </div>
        </ProfileSection>

        {/* Professional Summary Section (Editable) */}
        <ProfileSection
          title="Professional Summary"
          icon={<FaBriefcase className="section-icon" />}
          onEdit={() => handleEdit("summary")}
        >
          {editingSection === "summary" ? (
            <div className="edit-form">
              <textarea
                className="edit-textarea"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <div className="edit-actions">
                <button className="btn btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p>{summary}</p>
          )}
        </ProfileSection>

        {/* Key Skills Section (Editable) */}
        <ProfileSection
          title="Key Skills"
          icon={<FaCode className="section-icon" />}
          onEdit={() => handleEdit("skills")}
        >
          {editingSection === "skills" ? (
            <div className="edit-form">
              <input
                type="text"
                className="edit-input"
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(e.target.value.split(",").map((s) => s.trim()))
                }
                placeholder="e.g., React, Node.js, CSS"
              />
              <div className="edit-actions">
                <button className="btn btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          )}
        </ProfileSection>

        {/* Work Experience Section (Simplified Edit) */}
        <ProfileSection
          title="Work Experience"
          icon={<FaBriefcase className="section-icon" />}
          onEdit={() => handleEdit("workExperience")}
        >
          {editingSection === "workExperience" ? (
            <div className="edit-form">
              <p>
                Edit functionality for multiple entries is complex. A simple
                input is shown here.
              </p>
              <div className="edit-actions">
                <button className="btn btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            workExperience.map((job, index) => (
              <div key={index} className="experience-item">
                <h3>
                  {job.position} at {job.company}
                </h3>
                <p className="experience-item__duration">{job.duration}</p>
                <p>{job.description}</p>
              </div>
            ))
          )}
        </ProfileSection>

        {/* Education Section (Simplified Edit) */}
        <ProfileSection
          title="Education"
          icon={<FaGraduationCap className="section-icon" />}
          onEdit={() => handleEdit("education")}
        >
          {editingSection === "education" ? (
            <div className="edit-form">
              <p>
                Edit functionality for multiple entries is complex. A simple
                input is shown here.
              </p>
              <div className="edit-actions">
                <button className="btn btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>
                  {edu.degree} in {edu.field}
                </h3>
                <p>
                  {edu.university}, {edu.year}
                </p>
              </div>
            ))
          )}
        </ProfileSection>
      </div>
    </div>
  );
};

export default Profile;
