// Import paired styles
import '../../styles/components/Testimonial.css';
import React from "react";

// ✅ Only keep one of these (case-sensitive)
import "../../styles/components/Testimonial.css";

// ✅ Rename imports (variable names cannot start with numbers)
import karthikAvatar from "../../assets/images/Karthik.png";
import meeraAvatar from "../../assets/images/meera.png";
import rohanAvatar from "../../assets/images/rohan.png";
import snehaAvatar from "../../assets/images/sneha.png";

const testimonials = [
  {
    name: "Meeraj K",
    role: "Career Switcher, Hyderabad",
    quote:
      "I was stuck in analysis paralysis. Skyinten gave me clarity, structure, and momentum.",
    avatar: meeraAvatar,   // ✅ fixed name
  },
  {
    name: "Karthik Raj",
    role: "CS Student, Vizag",
    quote:
      "Every module felt like a power-up. I finally understood how to build, not just learn.",
    avatar: karthikAvatar,   // ✅ fixed name
  },
  {
    name: "Rohan Das",
    role: "Bootcamp Grad, Kakinada",
    quote:
      "I’ve tried 7 platforms. Only Skyinten made me consistent. That’s the real win.",
    avatar: rohanAvatar,   // ✅ use imported image
  },
  {
    name: "Sneha Reddy",
    role: "Working Professional, Bangalore",
    quote:
      "Skyinten helped me balance my job and upskilling journey without burning out.",
    avatar: snehaAvatar,
  },
];

const Testimonial = () => (
  <section className="testimonial-section">
    <h2 className="testimonial-heading">Real Voices. Real Impact.</h2>
    <div className="testimonial-grid">
      {testimonials.map((t, i) => (
        <div key={i} className="testimonial-card">
          <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
          <p className="testimonial-quote">“{t.quote}”</p>
          <div className="testimonial-meta">
            <strong>{t.name}</strong>
            <span className="testimonial-role">{t.role}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonial;
