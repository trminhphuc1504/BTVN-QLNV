export class validation{
    validationTNNV(tknv){
        const regex = /^\d{4,6}$/;
        if(tknv === ""){
            return "Tài khoản không được để trống";
        }
        if(regex.test(tknv) === false){
            return "Tài khoản phải có từ 4 đến 6 ký số";
        }
        return "";
    }
    
    validateName(name) {
        const regex = /^[a-zA-Z\s]+$/;
        if (!name) {
          return "Tên nhân viên không được để trống";
        }
        if (!regex.test(name)) {
          return "Tên nhân viên chỉ được chứa chữ cái";
        }
        return "";
    }
      

    validationEmail(email){
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (!email) {
            return "Email không được để trống";
        }
        if (!regex.test(email)) {
            return "Email không hợp lệ";
        }
        return "";
    }

    validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
        if (!password) {
          return "Mật khẩu không được để trống";
        }
        if (!regex.test(password)) {
          return "Mật khẩu phải có từ 6 đến 10 ký tự, chứa ít nhất 1 số, 1 chữ cái in hoa và 1 ký tự đặc biệt";
        }
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
      
      
}

