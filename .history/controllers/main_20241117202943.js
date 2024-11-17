import {nhanVien} from "../model/nhanVien.js";
import {validation} from "../model/validation.js"

let danhSachNhanVien = [];
const layThongTinNhanVien = () => {
    let tknv = document.getElementById('tknv').value;
    let tbTKNV = validationTKNV(tknv);
    document.getElementById("tbTKNV").innerText = tbTKNV;  // Hiển thị thông báo lỗi cho Tài khoản

    let name = document.getElementById('name').value;
    let tbTen = validationTen(name);
    document.getElementById("tbTen").innerText = tbTen;  // Hiển thị thông báo lỗi cho Tên

    let email = document.getElementById('email').value;
    let tbEmail = validationEmail(email);
    document.getElementById("tbEmail").innerText = tbEmail;  // Hiển thị thông báo lỗi cho Email

    let passWord = document.getElementById('password').value;
    let tbMatKhau = validationMatKhau(passWord);
    document.getElementById("tbMatKhau").innerText = tbMatKhau;  // Hiển thị thông báo lỗi cho Mật khẩu

    let datepicker = document.getElementById('datepicker').value;
    let tbNgay = validationNgay(datepicker);
    document.getElementById("tbNgay").innerText = tbNgay;  // Hiển thị thông báo lỗi cho Ngày làm

    let luongCB = document.getElementById('luongCB').value;
    let tbLuongCB = validationLuongCB(luongCB);
    document.getElementById("tbLuongCB").innerText = tbLuongCB;  // Hiển thị thông báo lỗi cho Lương cơ bản

    let chucvu = document.getElementById('chucvu').value;
    let tbChucVu = validationChucVu(chucvu);
    document.getElementById("tbChucVu").innerText = tbChucVu;  // Hiển thị thông báo lỗi cho Chức vụ

    let gioLam = document.getElementById('gioLam').value;
    let tbGioLam = validationGioLam(gioLam);
    document.getElementById("gioLam").innerText = tbGioLam;  // Hiển thị thông báo lỗi cho Giờ làm

    // Kiểm tra nếu tất cả trường hợp hợp lệ mới tạo đối tượng danh sách nhân viên
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
    console.log("Thông tin nhân viên:", nhanVien); // Kiểm tra thông tin nhân viên
    danhSachNhanVien.push(nhanVien);
    console.log("Danh sách nhân viên:", danhSachNhanVien); // Kiểm tra danh sách nhân viên
    themNhanVien();
};


