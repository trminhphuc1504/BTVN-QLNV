import { nhanVien } from "../model/nhanVien.js";
import { validation } from "../model/validation.js";
import { nhanVienServices } from "../model/nhanVienServices.js";

const validator = new validation();
// let danhSachNhanVien = [];
const nhanVienServiceInstance = new nhanVienServices();
let nhanVienToEdit = null;// Biến toàn cục để lưu nhân viên cần chỉnh sửa

const showError = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) {  // Kiểm tra phần tử có tồn tại không
        element.classList.add("d-block");
        element.innerText = message;
    }else {
        console.error(`Không tìm thấy phần tử với id: ${elementId}`);
    }
};


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
    showError("tbTKNV", errors.tknv);
    showError("tbTen", errors.name);
    showError("tbEmail", errors.email);
    showError("tbMatKhau", errors.passWord);
    showError("tbNgay", errors.datepicker);
    showError("tbLuongCB", errors.luongCB);
    showError("tbChucVu", errors.chucvu);
    showError("tbGiolam", errors.gioLam);

    // Hiển thị hoặc ẩn các thông báo lỗi
    for (let error in errors) {
        const errorElement = document.getElementById(`tb${error.charAt(0).toUpperCase() + error.slice(1)}`);
        console.log(errorElement);  // Kiểm tra xem phần tử có tồn tại không
        if (errorElement) {
            // errorElement.classList.add('sp-thongbao');
            errorElement.style.display = 'inline'; // Hiển thị thông báo lỗi
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

const renderNhanVien = () => {
    const danhSachNhanVien = nhanVienServiceInstance.danhSachNhanVien;
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
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editNhanVien('{${item.tknv}}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNhanVien('${item.tknv}')">Delete</button>
                </div>
            </td>
        </tr>
        `;
    });
    document.getElementById('tableDanhSach').innerHTML = htmlContent;
};

window.deleteNhanVien = (tknv)=>{
    nhanVienServiceInstance.deleteNhanVien(tknv);
    renderNhanVien()
    saveToLocalStorage();
}

// Lưu danh sách nhân viên vào LocalStorage 
const saveToLocalStorage = () => {
    localStorage.setItem('danhSachNhanVien', JSON.stringify(nhanVienServiceInstance.danhSachNhanVien));
};

//Đọc danh sách nhân viên từ LocalStorage
const loadFromLocalStorage = () =>{
    const data = localStorage.getItem('danhSachNhanVien');
    if(data){
        nhanVienServiceInstance.danhSachNhanVien = JSON.parse(data).map(item => new nhanVien(
            item.tknv,
            item.name,
            item.email,
            item.passWord,
            item.datepicker,
            item.luongCB,
            item.chucvu,
            item.gioLam
        ));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderNhanVien();

    document.getElementById('btnThemNV').onclick = () => {
        console.log('Đang bấm vào nút thêm nhân viên');
        const nhanVien = layThongTinNhanVien();
        if (nhanVien) {
            console.log("Thông tin nhân viên:", nhanVien);
            nhanVienServiceInstance.addNhanVien(nhanVien); // Sử dụng dịch vụ để thêm nhân viên
            console.log("Danh sách nhân viên:", nhanVienServiceInstance.danhSachNhanVien); // Debug
            renderNhanVien();
            saveToLocalStorage();
        }
    };
});

