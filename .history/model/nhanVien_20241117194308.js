export class nhanVien {
    constructor(tknv, name, email, passWord, datepicker, luongCB, chucvu, gioLam) {
        this.tknv = tknv;
        this.name = name;
        this.email = email;
        this.passWord = passWord;
        this.datepicker = datepicker;
        this.luongCB = luongCB;
        this.chucvu = chucvu;
        this.gioLam = gioLam;
    }


    xepLoai() {
        if(this.gioLam >= 192){
            return "this"
        }
    }





}
