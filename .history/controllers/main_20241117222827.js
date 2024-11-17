import { nhanVien } from "../model/nhanVien.js";
import { validation } from "../model/validation.js";

const validator = new validation();
let danhSachNhanVien = [];

const layThongTinNhanVien = () => {
    const tknv = document.getElementById('tknv').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const passWord = document.getElementById('password').value;
    const datepicker = document.getElementById('datepicker').value;
    const luongCB = parseInt(document.getElementById('luongCB').value.replace(/\s/g, ''));
    const chucvu = document.getElementById('chucvu').value;
    const gioLam = document.getElementById('gioLam').value;

    // Validate
    let errors = {};
    errors.tknv = validator.validationTNNV(tknv);
    errors.name = validator.validateName(name);
    errors.email = validator.validateEmail(email);
    errors.passWord = validator.validatePassword(passWord);
    errors.datepicker = validator.validateDate(datepicker);
    errors.luongCB = validator.validateLuongCB(luongCB);
    errors.chucvu = validator.validateChucVu(chucvu);
    errors.gioLam = validator.validateGioLam(gioLam);

    // Hiển thị thông báo lỗi
    document.getElementById("tbTKNV").innerText = errors.tknv;
    document.getElementById("tbTen").innerText = errors.name;
    document.getElementById("tbEmail").innerText = errors.email;
    document.getElementById("tbMatKhau").innerText = errors.passWord;
    document.getElementById("tbNgay").innerText = errors.datepicker;
    document.getElementById("tbLuongCB").innerText = errors.luongCB;
    document.getElementById("tbChucVu").innerText = errors.chucvu;
    document.getElementById("tbGiolam").innerText = errors.gioLam;

    // Hiển thị hoặc ẩn các thông báo lỗi
    for (let error in errors) {
        const errorElement = document.getElementById(`tb${error.charAt(0).toUpperCase() + error.slice(1)}`);
        if (errors[error]) {
            errorElement.classList.add('sp-thongbao');
            errorElement.style.display = 'inline'; // Hiển thị thông báo lỗi
        } else {
            errorElement.classList.remove('sp-thongbao');
            errorElement.style.display = 'none'; // Ẩn thông báo lỗi
        }
    }

    // Kiểm tra nếu có lỗi, không tiếp tục thêm nhân viên
    for (let error in errors) {
        if (errors[error]) {
            return null;
        }
    }

    // Nếu không có lỗi, tạo đối tượng nhân viên và trả về
    const danhSach = new nhanVien(tknv, name, email, passWord, datepicker, luongCB, chucvu, gioLam);
    return danhSach;
}

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

document.getElementById('btnThemNV').onclick = () => {
    const nhanVien = layThongTinNhanVien();
    if (nhanVien) {
        console.log("Thông tin nhân viên:", nhanVien); // Kiểm tra thông tin nhân viên
        danhSachNhanVien.push(nhanVien);
        console.log("Danh sách nhân viên:", danhSachNhanVien); // Kiểm tra danh sách nhân viên
        themNhanVien();
    }
};
