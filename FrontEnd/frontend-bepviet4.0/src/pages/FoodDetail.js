import { useParams } from "react-router-dom";

function FoodDetail() {
  const { id } = useParams();

  // ===== DỮ LIỆU GIẢ =====
  const monAn = {
    id,
    tenMon: "Phở bò Hà Nội",
    hinhAnh: "https://via.placeholder.com/400",
    ngayDang: "01/01/2026",
    moTa: "Món phở truyền thống của Hà Nội, nước dùng đậm đà.",
    nguyenLieu: [
      "Bánh phở",
      "Thịt bò",
      "Hành lá",
      "Gừng",
      "Gia vị"
    ],
    cacBuoc: [
      "Ninh xương bò",
      "Sơ chế nguyên liệu",
      "Chần bánh phở",
      "Hoàn thành và thưởng thức"
    ]
  };

  return (
    <div className="container my-4">
      <div className="card p-4 shadow-sm">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={monAn.hinhAnh}
              alt={monAn.tenMon}
              className="img-fluid border"
            />
          </div>

          <div className="col-md-8">
            <h3 className="fw-bold">{monAn.tenMon}</h3>
            <p className="text-muted">
                
              Ngày đăng: {monAn.ngayDang}
            </p>
            <p>{monAn.moTa}</p>

            <hr />

            <h5>Nguyên liệu</h5>
            <ul>
              {monAn.nguyenLieu.map((nl, index) => (
                <li key={index}>{nl}</li>
              ))}
            </ul>

            <h5>Các bước thực hiện</h5>
            <ol>
              {monAn.cacBuoc.map((b, index) => (
                <li key={index}>{b}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
