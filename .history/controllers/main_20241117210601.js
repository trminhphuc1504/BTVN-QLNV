import { nhanVien } from "../model/nhanVien.js";
import { validation } from "../model/validation.js";

let danhSachNhanVien = [];

document.addEventListener("DOMContentLoaded", function () {
    // Hàm kiểm tra thông tin nhân viên và trả về đối tượng nhân viên nếu không có lỗi
    const layThongTinNhanVien = () => {
      const validator = new validation(); // Tạo đối tượng validator từ lớp validation
  
      // Lấy giá trị từ các trường nhập liệu
      let tknv = document.getElementById('tknv')?.value;
      let name = document.getElementById('name')?.value;
      let email = document.getElementById('email')?.value;
      let password = document.getElementById('password')?.value;
      let ngayLam = document.getElementById('datepicker')?.value;
      let luongCB = document.getElementById('luongCB')?.value;
      let chucVu = document.getElementById('chucvu')?.value;
      let gioLam = document.getElementById('gioLam')?.value;
  
      // Kiểm tra dữ liệu và hiển thị thông báo lỗi nếu có
      let tbTKNV = validator.validationTNNV(tknv);
      let tbTen = validator.validateName(name); // Kiểm tra tên nhân viên
      let tbEmail = validator.validationEmail(email);
      let tbMatKhau = validator.validatePassword(password);
      let tbNgay = validator.validateDate(ngayLam); // Sửa: sử dụng ngayLam thay vì date
      let tbLuongCB = validator.validateLuong(luongCB);
      let tbChucVu = validator.validateChucVu(chucVu);
      let tbGiolam = validator.validationGioLam(gioLam);
  
      // Cập nhật các thông báo lỗi
      updateErrorMessage("tbTKNV", tbTKNV);
      updateErrorMessage("tbTen", tbTen);
      updateErrorMessage("tbEmail", tbEmail);
      updateErrorMessage("tbMatKhau", tbMatKhau);
      updateErrorMessage("tbNgay", tbNgay);
      updateErrorMessage("tbLuongCB", tbLuongCB);
      updateErrorMessage("tbChucVu", tbChucVu);
      updateErrorMessage("tbGiolam", tbGiolam);
  
      // Nếu có lỗi, dừng lại và không tạo đối tượng nhân viên
      if (tbTKNV || tbTen || tbEmail || tbMatKhau || tbNgay || tbLuongCB || tbChucVu || tbGiolam) {
        return null;  // Dừng lại nếu có lỗi
      }
  
      // Nếu không có lỗi, tạo đối tượng nhanVien và trả về
      const newNhanVien = new nhanVien(tknv, name, email, password, ngayLam, luongCB, chucVu, gioLam);
      return newNhanVien;
    };
  
    // Hàm cập nhật thông báo lỗi
    const updateErrorMessage = (elementId, message) => {
      let element = document.getElementById(elementId);
      if (element) {
        element.innerText = message;
        if (message) {
          element.classList.add("error");  // Thêm lớp 'error' nếu có lỗi
        } else {
          element.classList.remove("error");  // Bỏ lớp 'error' nếu không có lỗi
        }
      }
    };
  
    // Hàm thêm nhân viên vào danh sách
    const themNhanVien = () => {
      let htmlContent = '';
      danhSachNhanVien.forEach((item) => {
        htmlContent += `
          <tr>
              <td>${item.tknv}</td>
              <td>${item.name}</td>
              <td>${item.email}</td>
              <td>${item.datepicker}</td>
              <td>${item.chucvu}</td>
              <td>${item.tinhTongLuong()}</td>
              <td>${item.xepLoai()}</td>
              <td>
                <div class="button-container">
                  <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editNhanVien()">Edit</button>
                  <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" onclick="deleteNhanVien()">Delete</button>
                </div>
              </td>
          </tr>
        `;
      });
      document.getElementById('tableDanhSach').innerHTML = htmlContent;
    };
  
    // Lắng nghe sự kiện click trên nút thêm nhân viên
    document.getElementById('btnThemNV').onclick = () => {
      const nhanVienMoi = layThongTinNhanVien();
      if (nhanVienMoi !== null) {
        danhSachNhanVien.push(nhanVienMoi);
        themNhanVien();
      }
    };
  });
  
  
  
