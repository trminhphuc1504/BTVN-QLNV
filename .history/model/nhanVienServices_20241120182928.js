export class nhanVienServices{
    danhSachNhanVien = []
    contructor(){}

    //Thêm nhân viên
    addNhanVien(nhanVien){
        this.danhSachNhanVien.push(nhanVien)
    }
    //Xóa nhân viên
    deleteNhanVien(tknv){
        const index = this.danhSachNhanVien.findIndex((item)=>item.tknv === tknv)
        if(index !== -1){
            this.danhSachNhanVien.splice(index,1)
        }
    }

    //Cập nhật nhân viên
    editNhanVien(nhanVien){
        const index = this.danhSachNhanVien.findIndex((item)=> item.tknv === nhanVien.tknv )
        if(index !== -1){
            this.danhSachNhanVien[index] = nhanVien;
        }
    }

    //Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
    findNhanVienTheoLoai(loai){
        return this.danhSachNhanVien.filter((item)=>item.xepLoai() === loai)
    }

    //tìm kiếm nhân viên theo tên hoặc tài khoản 
    findNhanVienTheoTenHoacTaiKhoan(keyword){
        const lowerKeyword = keyword.toLowerCase();
        return this.danhSachNhanVien.filter((item)=>{
            item.tknv.toLowerCase().includes(lowerKeyword) // Tìm theo tài khoản 
            || item.name.toLowerCase().includes(lowerKeyword);
        })
    }
}