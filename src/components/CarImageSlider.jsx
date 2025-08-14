// src/components/CarImageSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const CarImageSlider = ({ images, name }) => {
    // If only one image exists, repeat it 3 times so loop looks smooth
    const displayImages = images.length === 1 ? [...images, ...images, ...images] : images;

    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            className="rounded overflow-hidden"
        >
            {displayImages.map((img, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={img}
                        alt={`${name} ${index + 1}`}
                        className="w-full h-64 object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CarImageSlider;
