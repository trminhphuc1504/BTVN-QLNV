export class validation{
    validationTNNV(tknv){
        const regex = /^\d{4,6}$/;
        if(!tknv){
            return "Tài khoản không được để trống";
        }
        if(!regex.test(tknv)){
            
        }
    }
}