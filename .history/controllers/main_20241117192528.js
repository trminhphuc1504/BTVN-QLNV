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

const themNhanVien  = (arr)=>{
    let htmlContent = ''
    arr.forEach((item)=>{
        htmlContent += `
        <tr>
            <td>${item.tknv}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.passWord}</td>
            <td>${item.datepicker}</td>
            <td>${item.luongCB}</td>
            <td>${item.chucvu}</td>
            <td>${item.gioLam}</td>
        </tr>
        `;
    });
    document.getElementById('tableDanhSach').innerHTML = htmlContent;
};

document.getElementById('')

