// Import paired styles
import '../../styles/components/Testimonial.css';
import React from "react";
import "../../styles/components/testimonial.css";

const testimonials = [
  {
    name: "Meera K",
    role: "Career Switcher, Hyderabad",
    quote:
      "I was stuck in analysis paralysis. Skyinten gave me clarity, structure, and momentum.",
    avatar: "/avatars/meera.png",
  },
  {
    name: "Karthik Raj",
    role: "CS Student, Vizag",
    quote:
      "Every module felt like a power-up. I finally understood how to build, not just learn.",
    avatar: "/avatars/karthik.png",
  },
  {
    name: "Rohan Das",
    role: "Bootcamp Grad, Kakinada",
    quote:
      "I’ve tried 7 platforms. Only Skyinten made me consistent. That’s the real win.",
    avatar: "/avatars/rohan.png",
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
