// src/data/coursesData.js
const CoursesData = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the fundamentals of React.",
    isFree: true,
    videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
    modules: [
      { id: 1, title: "📘 Introduction", content: "Welcome to React Basics!" },
      { id: 2, title: "⚡ JSX & Components", content: "Understanding JSX and Components." },
      { id: 3, title: "🛠️ State & Props", content: "Learn about state and props." },
      { id: 4, title: "🚀 Final Project", content: "Build a small React app." },
    ],
  },
  {
    id: 2,
    title: "Advanced React",
    description: "Dive deeper into React ecosystem.",
    isFree: true,
    videoUrl: "https://www.youtube.com/embed/PoRJizFvM7s",
    modules: [
      { id: 1, title: "🔄 React Router", content: "Learn navigation and routing." },
      { id: 2, title: "⚡ Context API", content: "Manage global state with Context." },
      { id: 3, title: "📦 Redux", content: "State management using Redux." },
      { id: 4, title: "🚀 Deployment", content: "Deploy your React app." },
    ],
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "Full-stack development from scratch.",
    isFree: false,
    videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
    modules: [
      { id: 1, title: "🌐 HTML & CSS", content: "Basics of web design." },
      { id: 2, title: "⚡ JavaScript", content: "Learn vanilla JS deeply." },
      { id: 3, title: "🛠️ Backend with Node.js", content: "Intro to server-side development." },
      { id: 4, title: "🚀 Final Project", content: "Build a complete web app." },
    ],
  },
];

export default CoursesData;
