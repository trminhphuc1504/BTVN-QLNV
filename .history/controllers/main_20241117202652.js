import {nhanVien} from "../model/nhanVien.js";
import {validation} from "../model/validation.js"

let danhSachNhanVien = [];
const layThongTinNhanVien = ()=>{
    let tknv = document.getElementById('tknv').value;
    let tbTKNV = validationTNNV(tknv);
    document.getElementById("tbTKNV").innerText = tbTKNV;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const passWord = document.getElementById('password').value;
    const datepicker = document.getElementById('datepicker').value;
    const luongCB = document.getElementById('luongCB').value;
    const chucvu = document.getElementById('chucvu').value;
    const gioLam = document.getElementById('gioLam').value;


    const danhSach = new nhanVien(tknv,name,email,passWord,datepicker,luongCB,chucvu,gioLam)
    return danhSach
}

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


