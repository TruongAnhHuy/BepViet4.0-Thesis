//goi ys mon an noi bat hay trinh chieu mon an 
export default function Slide() {
  return (
    <div
      id="carouselMulti"
      className="carousel slide mt-5"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-inner">

        <div className="carousel-item active">
          <div className="row g-2">
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
            <div className="col-4">
              <img src="/pho02.jpg" className="d-block w-100 rounded" />
            </div>
          </div>
        </div>

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

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselMulti"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselMulti"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
