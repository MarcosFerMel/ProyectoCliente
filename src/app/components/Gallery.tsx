"use client";

import { useState } from "react";
import FsLightbox from "fslightbox-react";

const images = [
  "/images/casa1.jpg",
  "/images/casa2.jpg",
  "/images/casa3.jpg",
  "/images/casa4.jpg",
  "/images/casa5.jpg",
  "/images/casa6.jpg",
];

export default function GalleryComponent() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const openLightbox = (index: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index + 1,
    });
  };

  return (
    <div className="container mx-auto my-12 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Galería de Imágenes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="cursor-pointer" onClick={() => openLightbox(index)}>
            <img
              src={image}
              alt={`Casa rural ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images}
        slide={lightboxController.slide}
      />
    </div>
  );
}
