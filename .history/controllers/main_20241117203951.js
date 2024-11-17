import {nhanVien} from "../model/nhanVien.js";
import {validation} from "../model/validation.js"

let danhSachNhanVien = [];

const layThongTinNhanVien = () => {
    const validator = new validation();  // Tạo một đối tượng validator từ lớp validation

    let tknv = document.getElementById('tknv').value;
    let tbTKNV = validator.validationTNNV(tknv);  // Gọi phương thức validationTNNV
    document.getElementById("tbTKNV").innerText = tbTKNV;

    let name = document.getElementById('name').value;
    let tbTen = validator.validateName(name);  // Gọi phương thức validateName
    document.getElementById("tbTen").innerText = tbTen;

    let email = document.getElementById('email').value;
    let tbEmail = validator.validationEmail(email);  // Gọi phương thức validationEmail
    document.getElementById("tbEmail").innerText = tbEmail;

    let passWord = document.getElementById('password').value;
    let tbMatKhau = validator.validatePassword(passWord);  // Gọi phương thức validatePassword
    document.getElementById("tbMatKhau").innerText = tbMatKhau;

    let datepicker = document.getElementById('datepicker').value;
    let tbNgay = validator.validateDate(datepicker);  // Gọi phương thức validateDate
    document.getElementById("tbNgay").innerText = tbNgay;

    let luongCB = document.getElementById('luongCB').value;
    let tbLuongCB = validator.validateLuong(luongCB);  // Gọi phương thức validateLuong
    document.getElementById("tbLuongCB").innerText = tbLuongCB;

    let chucvu = document.getElementById('chucvu').value;
    let tbChucVu = validator.validateChucVu(chucvu);  // Gọi phương thức validateChucVu
    document.getElementById("tbChucVu").innerText = tbChucVu;

    let gioLam = document.getElementById('gioLam').value;
    let tbGioLam = validator.validateGioLam(gioLam);  // Gọi phương thức validateGioLam
    document.getElementById("tbGioLam").innerText = tbGioLam;

    // Kiểm tra nếu tất cả các trường đều hợp lệ
    if (tbTKNV === "" && tbTen === "" && tbEmail === "" && tbMatKhau === "" && tbNgay === "" && tbLuongCB === "" && tbChucVu === "" && tbGioLam === "") {
        const danhSach = new nhanVien(tknv, name, email, passWord, datepicker, luongCB, chucvu, gioLam);
        return danhSach;  // Trả về đối tượng nhân viên nếu không có lỗi
    }

    return null;  // Nếu có lỗi, không tạo đối tượng nhân viên
};



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




