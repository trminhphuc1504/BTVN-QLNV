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

    validationName(name){
        const regex = /^[a-zA-Z\s]+$/;
        if(name === ""){
            return "Tên nhân viên không được để trống";
        }
        if(regex.test(name) === false){
            return "Tên nhân viên chỉ được chứa chữ cái";
        }
        return "";
    }

    validationEmail(email){
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    }
}

