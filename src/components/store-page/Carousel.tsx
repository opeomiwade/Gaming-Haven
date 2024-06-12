import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/types/types";


const Carousel: React.FC<{ images: Image[] }> = ({ images }) => {
  return (
    <div id="carouselExample" className="carousel slide my-4">
      <div className="carousel-inner rounded-md">
        {images.map((image, index) => {
          return (
            <div
              key={image.imageId}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              } bg-gray-100`}
            >
              <img
                src={image.imageUrl}
                className="d-block w-fit md:h-[600px] mx-auto"
                alt="..."
              />
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev hover:cursor-pointer"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon bg-custom-50"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next hover:cursor-pointer"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon bg-custom-50"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
