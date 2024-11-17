import { nhanVien } from "../model/nhanVien.js";

const layThongTinNhanVien = ()=>{
    const tknv = document.getElementById('tknv').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const passWord = document.getElementById('password').value;
    const datepicker = document.getElementById('datepicker').value;
    const luongCB = document.getElementById('luongCB').value;
    const chucvu = document.getElementById('chucvu').value;
    const gioLam = document.getElementById('gioLam').value;


    const nhanVien = new nhanVien(tknv,name,email,passWord,datepicker,luongCB,chucvu,gioLam)
    return nhanVien
}

document.getElementById('btnThemNV').onclick = (event)=>{
    event.preventDefault()
    const nhanvien = 
}

