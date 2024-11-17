export class validation{
    validationTNNV(tknv){
        const regex = /^[0-9]{4,6}$/;
        if (!tknv) return "Tài khoản không được để trống";
        if (!regex.test(tknv)) return "Tài khoản phải từ 4 đến 6 ký tự số";
        return "";
    }
    
    validateName(name) {
        const regex = /^[a-zA-Z\s]+$/;
        if (!name) return "Tên nhân viên không được để trống";
        if (!regex.test(name)) return "Tên nhân viên chỉ chứa chữ cái";
        return "";
    }
    validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email) return "Email không được để trống";
        if (!regex.test(email)) return "Email không hợp lệ";
        return "";
    }
    
    validatePassword(password) {
            const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,10}$/;
            if (!password) return "Mật khẩu không được để trống";
            if (!regex.test(password)) return "Mật khẩu phải từ 6-10 ký tự, có ít nhất 1 số, 1 chữ hoa, và 1 ký tự đặc biệt";
            return "";
        }
    
    validateDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/([0-2][1-9]|3[01])\/\d{4}$/;
        if (!date) {
          return "Ngày làm không được để trống";
        }
        if (!regex.test(date)) {
          return "Ngày làm không đúng định dạng mm/dd/yyyy";
        }
        return "";
    }

    validateLuong(luongCB) {
        if (!luongCB) {
          return "Lương cơ bản không được để trống";
        }
        if (luongCB < 1000000 || luongCB > 20000000) {
          return "Lương cơ bản phải trong khoảng từ 1.000.000 đến 20.000.000";
        }
        return "";
    }

    validateChucVu(chucvu) {
        const validChucVu = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
        if (!chucvu || !validChucVu.includes(chucvu)) {
          return "Chức vụ không hợp lệ. Vui lòng chọn Giám đốc, Trưởng phòng hoặc Nhân viên";
        }
        return "";
    }
    
    validationGioLam(gioLam) {
        if (!gioLam) {
          return "Số giờ làm không được để trống!";
        }
        if (isNaN(gioLam) || gioLam < 80 || gioLam > 200) {
          return "Số giờ làm trong tháng phải từ 80 đến 200 giờ!";
        }
        return "";
    }
}

