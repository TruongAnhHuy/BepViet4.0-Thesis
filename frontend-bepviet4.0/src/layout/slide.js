import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
const BannerCarousel = () => {
  return (
    <div
      id="carouselMulti"
      className="carousel slide"
    data-bs-interval="5000"
    >
      <div className="carousel-inner">

        {/* SLIDE 1 */}
        <div className="carousel-item active">
          <div className="row g-2">
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
            <div className="col-4">
              <img src="/pho01.jpg" className="d-block w-100 rounded" />
            </div>
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="carousel-item">
          <div className="row g-2">
            <div className="col-4">
              <img src="/pho01.jpg" className="d-block w-100 rounded" />
            </div>
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
          </div>
        </div>

      </div>

      
    </div>
  );
};

export default BannerCarousel;
