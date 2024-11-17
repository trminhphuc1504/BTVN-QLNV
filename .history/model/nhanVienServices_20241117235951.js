export class nhanVienServices{
    danhSachNhanVien = []
    contructor(){}

    //Thêm nhân viên
    addNhanVien(nhanVien){
        this.danhSachNhanVien.push(nhanVien)
    }
    //Xóa nhân viên
    deleteNhanVien(nhanVien){
        const index = this.danhSachNhanVien.findIndex((item)=>item.tknv === tknv)
        if(index !== -1){
            this.danhSachNhanVien.splice(index,1)
        }
    }
}