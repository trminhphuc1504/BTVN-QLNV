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
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editNhanVien('${item.tknv}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNhanVien('${item.tknv}')">Delete</button>
                </div>
            </td>
        </tr>
        `;
    });
    document.getElementById('tableDanhSach').innerHTML = htmlContent;
};

//delete
window.deleteNhanVien = (tknv)=>{
    nhanVienServiceInstance.deleteNhanVien(tknv);
    renderNhanVien()
    saveToLocalStorage();
}

let isEditMode =false;

//edit
window.editNhanVien = (tknv) => {
    nhanVienToEdit = nhanVienServiceInstance.danhSachNhanVien.find(item => item.tknv === tknv);
    if (nhanVienToEdit) {
        // Điền thông tin vào form
        document.getElementById('tknv').value = nhanVienToEdit.tknv;
        document.getElementById('name').value = nhanVienToEdit.name;
        document.getElementById('email').value = nhanVienToEdit.email;
        document.getElementById('password').value = nhanVienToEdit.passWord;
        document.getElementById('datepicker').value = nhanVienToEdit.datepicker;
        document.getElementById('luongCB').value = nhanVienToEdit.luongCB;
        document.getElementById('chucvu').value = nhanVienToEdit.chucvu;
        document.getElementById('gioLam').value = nhanVienToEdit.gioLam;


        document.getElementById('btnThemNV').style.display = 'none'; // Ẩn nút thêm
        document.getElementById('btnCapNhat').style.display = 'inline'; // Hiển thị nút cập nhật
    }
}



const toggleButtons = (isEditMode) => {
    if (isEditMode) {
        document.getElementById('btnThemNV').style.display = 'none'; // Ẩn nút thêm
        document.getElementById('btnCapNhat').style.display = 'inline'; // Hiển thị nút cập nhật
    } else {
        document.getElementById('btnThemNV').style.display = 'inline'; // Hiển thị nút thêm
        document.getElementById('btnCapNhat').style.display = 'none'; // Ẩn nút cập nhật
    }
};

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

const resetForm = () =>{
    document.getElementById('tknv').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('datepicker').value = '';
    document.getElementById('luongCB').value = '';
    document.getElementById('chucvu').value = '';
    document.getElementById('gioLam').value = ''; 
}

// document.addEventListener('DOMContentLoaded', () => {
//     loadFromLocalStorage();
//     renderNhanVien();

//     // Khi bấm vào nút "Thêm nhân viên"
//     document.getElementById('btnThemNV').onclick = () => {
//         console.log('Đang bấm vào nút thêm nhân viên');
//         isEditMode = false;

//         // Kiểm tra và thêm nhân viên mới
//         const nhanVien = layThongTinNhanVien();
//         if (nhanVien) {
//             console.log("Thông tin nhân viên:", nhanVien);
//             nhanVienServiceInstance.addNhanVien(nhanVien); // Sử dụng dịch vụ để thêm nhân viên
//             console.log("Danh sách nhân viên:", nhanVienServiceInstance.danhSachNhanVien); // Debug
//             renderNhanVien();
//             saveToLocalStorage();
//             resetForm();

//             toggleButtons(isEditMode);
//         }
//     };

//     // Khi bấm vào nút "Cập nhật"
//     document.getElementById('btnCapNhat').onclick = () => {
//         console.log('Đang bấm vào nút lưu chỉnh sửa');
//         const nhanVien = layThongTinNhanVien();
//         if (nhanVien) {
//             // Cập nhật nhân viên
//             nhanVienServiceInstance.editNhanVien(nhanVien);
//             console.log("Danh sách nhân viên:", nhanVienServiceInstance.danhSachNhanVien);
//             renderNhanVien();
//             saveToLocalStorage();

//             isEditMode = true;

//             toggleButtons(isEditMode)
//         }
//     }
// });

document.getElementById('btnThemNV').onclick = () => {
    console.log('Đang bấm vào nút thêm nhân viên');
    isEditMode = false;  // Đặt lại chế độ không phải chỉnh sửa

    // Reset form trước khi thêm nhân viên mới
    resetForm();

    // Ẩn nút "Cập nhật" và hiển thị nút "Thêm nhân viên"
    toggleButtons(isEditMode);

    // Kiểm tra và thêm nhân viên mới
    const nhanVien = layThongTinNhanVien();
    if (nhanVien) {
        console.log("Thông tin nhân viên:", nhanVien);
        nhanVienServiceInstance.addNhanVien(nhanVien); // Thêm nhân viên mới
        console.log("Danh sách nhân viên:", nhanVienServiceInstance.danhSachNhanVien); // Debug
        renderNhanVien();
        saveToLocalStorage();
    }
};


document.getElementById('btnCapNhat').onclick = () => {
    console.log('Đang bấm vào nút lưu chỉnh sửa');
    const nhanVien = layThongTinNhanVien();
    if (nhanVien) {
        // Cập nhật thông tin nhân viên
        nhanVienServiceInstance.editNhanVien(nhanVien);
        console.log("Danh sách nhân viên:", nhanVienServiceInstance.danhSachNhanVien);
        renderNhanVien();
        saveToLocalStorage();

        // Đặt lại chế độ "thêm mới" sau khi cập nhật
        isEditMode = false;

        // Reset form và hiển thị lại các nút
        resetForm();
        toggleButtons(isEditMode);
    }
};