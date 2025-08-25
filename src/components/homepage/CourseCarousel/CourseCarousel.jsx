// Import paired styles

import "../../../styles/components/CourseCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import CourseCard from "./CourseCard.jsx";
import { useRef, useEffect, useState } from "react";

export default function CourseCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const courses = [
    {
      title: "Python Essentials",
      duration: "6h",
      level: "Beginner",
      image: "/images/courses/python.jpg",
    },
    {
      title: "Java Programming",
      duration: "8h",
      level: "Intermediate",
      image: "/images/courses/java.jpg",
    },
    {
      title: "AI & ML Foundations",
      duration: "10h",
      level: "Advanced",
      image: "/images/courses/ai.jpg",
    },
    {
      title: "Data Analysis with Pandas",
      duration: "7h",
      level: "Intermediate",
      image: "/images/courses/data.jpg",
    },
    {
      title: "React Mastery",
      duration: "9h",
      level: "Advanced",
      image: "/images/courses/react.jpg",
    },
    {
      title: "Docker Deep Dive",
      duration: "5h",
      level: "Intermediate",
      image: "/images/courses/docker.jpg",
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
