import {nhanVien} from "../model/nhanVien.js";
import {validation} from "../model/validation.js"

let danhSachNhanVien = [];

document.addEventListener("DOMContentLoaded", function() {
    // Hàm kiểm tra thông tin nhân viên
    const layThongTinNhanVien = () => {
      const validator = new validation();  // Tạo đối tượng validator từ lớp validation
  
      let tknv = document.getElementById('tknv')?.value;
      let tbTKNV = validator.validationTNNV(tknv);  // Kiểm tra dữ liệu tài khoản
      let elementTKNV = document.getElementById("tbTKNV");
      if (elementTKNV) {
        elementTKNV.innerText = tbTKNV;
        if (tbTKNV) { // Nếu có lỗi, thêm class thông báo lỗi
          elementTKNV.classList.add("error");
        } else {
          elementTKNV.classList.remove("error");
        }
      }
  
      let name = document.getElementById('name')?.value;
      let tbTen = validator.validationTen(name);
      let elementTen = document.getElementById("tbTen");
      if (elementTen) {
        elementTen.innerText = tbTen;
        if (tbTen) { // Nếu có lỗi, thêm class thông báo lỗi
          elementTen.classList.add("error");
        } else {
          elementTen.classList.remove("error");
        }
      }
  
      let email = document.getElementById('email')?.value;
      let tbEmail = validator.validationEmail(email);
      let elementEmail = document.getElementById("tbEmail");
      if (elementEmail) {
        elementEmail.innerText = tbEmail;
        if (tbEmail) { // Nếu có lỗi, thêm class thông báo lỗi
          elementEmail.classList.add("error");
        } else {
          elementEmail.classList.remove("error");
        }
      }
  
      let password = document.getElementById('password')?.value;
      let tbMatKhau = validator.validationPassword(password);
      let elementMatKhau = document.getElementById("tbMatKhau");
      if (elementMatKhau) {
        elementMatKhau.innerText = tbMatKhau;
        if (tbMatKhau) { // Nếu có lỗi, thêm class thông báo lỗi
          elementMatKhau.classList.add("error");
        } else {
          elementMatKhau.classList.remove("error");
        }
      }
  
      let ngayLam = document.getElementById('datepicker')?.value;
      let tbNgay = validator.validationNgay(ngayLam);
      let elementNgay = document.getElementById("tbNgay");
      if (elementNgay) {
        elementNgay.innerText = tbNgay;
        if (tbNgay) { // Nếu có lỗi, thêm class thông báo lỗi
          elementNgay.classList.add("error");
        } else {
          elementNgay.classList.remove("error");
        }
      }
  
      let luongCB = document.getElementById('luongCB')?.value;
      let tbLuongCB = validator.validationLuong(luongCB);
      let elementLuongCB = document.getElementById("tbLuongCB");
      if (elementLuongCB) {
        elementLuongCB.innerText = tbLuongCB;
        if (tbLuongCB) { // Nếu có lỗi, thêm class thông báo lỗi
          elementLuongCB.classList.add("error");
        } else {
          elementLuongCB.classList.remove("error");
        }
      }
  
      let chucVu = document.getElementById('chucvu')?.value;
      let tbChucVu = validator.validationChucVu(chucVu);
      let elementChucVu = document.getElementById("tbChucVu");
      if (elementChucVu) {
        elementChucVu.innerText = tbChucVu;
        if (tbChucVu) { // Nếu có lỗi, thêm class thông báo lỗi
          elementChucVu.classList.add("error");
        } else {
          elementChucVu.classList.remove("error");
        }
      }
  
      let gioLam = document.getElementById('gioLam')?.value;
      let tbGiolam = validator.validationGio(gioLam);
      let elementGioLam = document.getElementById("tbGiolam");
      if (elementGioLam) {
        elementGioLam.innerText = tbGiolam;
        if (tbGiolam) { // Nếu có lỗi, thêm class thông báo lỗi
          elementGioLam.classList.add("error");
        } else {
          elementGioLam.classList.remove("error");
        }
      }
    };
  
    // Lắng nghe sự kiện click trên nút thêm nhân viên
    document.getElementById("btnThemNV").onclick = function() {
      layThongTinNhanVien();
    };
  });



const themNhanVien  = ()=> {
    let htmlContent = ''
    danhSachNhanVien.forEach((item)=> {
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

document.getElementById('btnThemNV').onclick = () => {
    const nhanVien = layThongTinNhanVien();
    if (nhanVien !== null) {  // Chỉ thêm vào danh sách nếu không có lỗi
        danhSachNhanVien.push(nhanVien);
        themNhanVien();
    } else {
        alert("Có lỗi trong việc nhập thông tin nhân viên. Vui lòng kiểm tra lại.");
    }
};




