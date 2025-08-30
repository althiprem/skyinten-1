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
import BackButton from "../BackButton";



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
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState({});
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchProfileData = () => {
      setTimeout(() => {
        try {
          setProfileData(demoProfileData);
          setName(demoProfileData.name);
          setHeadline(demoProfileData.headline);
          setLocation(demoProfileData.location);
          setContact(demoProfileData.contact);
          setSummary(demoProfileData.summary);
          setSkills(demoProfileData.skills);
          setWorkExperience(demoProfileData.workExperience);
          setEducation(demoProfileData.education);
        } catch (err) {
          setError("Failed to fetch profile data.");
        } finally {
          setLoading(false);
        }
      }, 1500);
    };

    fetchProfileData();
  }, []);

  const handleEdit = (sectionName) => {
    setEditingSection(sectionName);
  };

  const handleSave = () => {
    console.log("Saving changes:", {
      name,
      headline,
      location,
      contact,
      summary,
      skills,
      workExperience,
      education,
    });
    setEditingSection(null);
  };

  const handleCancel = () => {
    setName(profileData.name);
    setHeadline(profileData.headline);
    setLocation(profileData.location);
    setContact(profileData.contact);
    setSummary(profileData.summary);
    setSkills(profileData.skills);
    setWorkExperience(profileData.workExperience);
    setEducation(profileData.education);
    setEditingSection(null);
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
      <div className="absolute top-6" style={{ right: "2in" }}>
        <BackButton />
      </div>
   
      {/* Profile Header with Edit */}
      <div className="profile-header">
        {editingSection === "profileHeader" ? (
          <div className="edit-form">
            <input
              type="text"
              className="edit-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              className="edit-input"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Headline"
            />
            <input
              type="text"
              className="edit-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
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
          <>
            <div className="profile-header__avatar">
              <img src={contact.avatar} alt="User Avatar" />
            </div>
            <div className="profile-header__info">
              <h1 className="profile-header__name">{name}</h1>
              <p className="profile-header__headline">{headline}</p>
              <p className="profile-header__location">{location}</p>
            </div>
            <button
              className="edit-btn"
              onClick={() => handleEdit("profileHeader")}
            >
              <FaPencilAlt /> Edit
            </button>
          </>
        )}
      </div>

      <div className="profile-main">
        {/* Contact Information Section (Editable) */}
        <ProfileSection
          title="Contact Information"
          icon={<FaUserCircle className="section-icon" />}
          onEdit={() => handleEdit("contact")}
        >
          {editingSection === "contact" ? (
            <div className="edit-form">
              <input
                type="text"
                className="edit-input"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="text"
                className="edit-input"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                placeholder="Phone"
              />
              <input
                type="text"
                className="edit-input"
                value={contact.avatar}
                onChange={(e) =>
                  setContact({ ...contact, avatar: e.target.value })
                }
                placeholder="Avatar URL"
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
            <div className="contact-info">
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </div>
          )}
        </ProfileSection>

        {/* Professional Summary Section */}
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

        {/* Key Skills Section */}
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

        {/* Work Experience Section */}
        <ProfileSection
          title="Work Experience"
          icon={<FaBriefcase className="section-icon" />}
          onEdit={() => handleEdit("workExperience")}
        >
          {editingSection === "workExperience" ? (
            <div className="edit-form">
              <p>Edit functionality for multiple entries is simplified.</p>
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

        {/* Education Section */}
        <ProfileSection
          title="Education"
          icon={<FaGraduationCap className="section-icon" />}
          onEdit={() => handleEdit("education")}
        >
          {editingSection === "education" ? (
            <div className="edit-form">
              <p>Edit functionality for multiple entries is simplified.</p>
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
