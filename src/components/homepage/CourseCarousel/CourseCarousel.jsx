// Import paired styles
import "../../../styles/components/CourseCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import CourseCard from "./CourseCard.jsx";
import { useRef, useEffect, useState } from "react";

// ✅ Import images from assets
import pythonImg from "../../../assets/images/python.png";
import javaImg from "../../../assets/images/java.png";
import aiImg from "../../../assets/images/ai&ml.png";
import dataImg from "../../../assets/images/dataanalysis.png";
import reactImg from "../../../assets/images/react.png";
import dockerImg from "../../../assets/images/docker.png";

export default function CourseCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const courses = [
    {
      title: "Python Essentials",
      duration: "6h",
      level: "Beginner",
      image: pythonImg,
    },
    {
      title: "Java Programming",
      duration: "8h",
      level: "Intermediate",
      image: javaImg,
    },
    {
      title: "AI & ML Foundations",
      duration: "10h",
      level: "Advanced",
      image: aiImg,
    },
    {
      title: "Data Analysis with Pandas",
      duration: "7h",
      level: "Intermediate",
      image: dataImg,
    },
    {
      title: "React Mastery",
      duration: "9h",
      level: "Advanced",
      image: reactImg,
    },
    {
      title: "Docker Deep Dive",
      duration: "5h",
      level: "Intermediate",
      image: dockerImg,
    },
  ];

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section className="courseCarousel">
      <div className="courseCarousel__container">
        <h3 className="courseCarousel__title">Explore Our Top Courses</h3>

        <div className="courseCarousel__swiper">
          <div className="courseCarousel__nav">
            <button ref={prevRef} className="courseCarousel__arrow">
              ‹
            </button>
            <button ref={nextRef} className="courseCarousel__arrow">
              ›
            </button>
          </div>

          {swiperReady && (
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {courses.map((course) => (
                <SwiperSlide
                  key={course.title}
                  className="courseCarousel__slide"
                >
                  <CourseCard {...course} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
