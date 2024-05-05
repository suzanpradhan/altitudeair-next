/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import useMediaQuery from "../../../hooks/useMediaQuery";
import Modal from "../../elements/Modal";
import axiosInst from "../../../util/axiosInst";
import { constants } from "../../../util/constants";

export default function Gallery() {
  const [modalImage, setModalImage] = useState(null);
  const [images, setImages] = useState([]);

  const galleryContainer = useRef();
  let pos = { left: 0, x: 0 };

  useEffect(() => {
    galleryContainer.current.scrollLeft = 0;
    galleryContainer.current.addEventListener("mousedown", mouseDownHandler);
    axiosInst.get("/gallery/featuredlist/").then((result) => {
      const data = result.data.data;
      setImages(data);
    });
  }, []);

  const mouseDownHandler = function (e) {
    pos = {
      // The current scroll
      left: galleryContainer.current.scrollLeft,
      // Get the current mouse position
      x: e.clientX,
    };

    // galleryContainer.current.style.pointerEvents = "none";

    galleryContainer.current.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseMoveHandler = function (e) {
    galleryContainer.current.style.cursor = "grabbing";
    galleryContainer.current.style.userSelect = "none";
    galleryContainer.current.style.scrollSnapType = "";
    galleryContainer.current.style.pointerEvents = "stroke";

    // How far the mouse has been moved
    const dx = e.clientX - pos.x;

    // Scroll the element
    galleryContainer.current.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    galleryContainer.current.style.cursor = "grab";
    galleryContainer.current.style.scrollSnapType = "x mandatory";
    galleryContainer.current.style.removeProperty("user-select");
    galleryContainer.current.style.removeProperty("pointer-events");
    galleryContainer.current.removeEventListener("mousemove", mouseMoveHandler);
  };

  const openModal = (imagePath) => {
    setModalImage(imagePath);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <section className="gallery">
      <div className="dashed_news_container">
        <div className="image_content_container">
          <h2>GALLERY</h2>

          <div className="image_flex_container" ref={galleryContainer}>
            {images.map((image) => {
              const title = image.title;
              const imageUrl = constants.baseUrl + image.image;
              if (!image.isImage) return null;
              return (
                <div
                  key={image.id}
                  className="image_container"
                  onClick={() => {
                    openModal(imageUrl);
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    onError={(e) => {
                      e.currentTarget.src = "/images/errors/placeholder.webp";
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {modalImage && (
        <Modal show={openModal} hide={closeModal}>
          <img
            src={modalImage}
            alt="Gallery Image"
            onError={(e) => {
              e.currentTarget.src = "/images/errors/placeholder.webp";
            }}
          />
        </Modal>
      )}
    </section>
  );
}
