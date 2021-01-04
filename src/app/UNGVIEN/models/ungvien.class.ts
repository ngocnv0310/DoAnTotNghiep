import { today } from './Base.class';
export class Ungvien {
    public idUngvien:number;
    public diachi:string;
    public email:string;
    public gioitinh:number;
    public hinhanh:string;
    public kinhnghiem:number;
    public luong:number;
    public ngaysinh:string;
    public ngaytao:string = today ;
    public sdt:string;
    public urlCv:string;
    public mota:string;
    public ten:string;
    public ho:string;
    public idQuan:number;
    public idThanhpho:number;
    public docthan:boolean;
    public matkhau:string;
    public tenthanhpho:string;
    public thoigianlamviecmongmuon:string;
    public nganhmongmuon:number;
    public capbacmongmuon:string;
    public tennganh:string;
    public trangthai:string;
    public idQuanNavigation:any;
    public isdelete: boolean=false;
    public sociallogin: boolean=false;
    public luotxem: number=0;
    public kynangcanhan:string;
    public muctieunghenghiep:string;
    public vitriungtuyen:string;
}

export class IsLogin{
    public islogin:boolean = false;
    public message:string;
    public data :string;

    constructor(){

    }
    
}

export class Ngoaingu{
    public idUngvien:number;
    public idNgoaingu:number;
    public tenngoaingu:string;
    public nghe:boolean = false;
    public noi:boolean = false;
    public doc:boolean= false;
    public viet:boolean= false;
    public coban:boolean= false;
    public ghichu:string;

}

export class Kinhnghiem{
    public idUngvien:number;
    public chucdanh:string;
    public chucvu:string;
    public congviechientai:boolean = false;
    public ghichu:string;
    public tencongty:string;
    public thoigianbatdau:string;
    public thoigianketthuc:string;
}

export class Bangcap{
    public idBangcap:number;
    public idUngvien:number;
    public idTrinhdo:number;
    public chuyennganh:string;
    public tentruong:string;
    public ngaybatdau:string;
    public ngayketthuc:string;
    public tenbangcap:string;
    public ghichu:string;
    public giatri:number;
    public tentrinhdo:string;
    
}

export class Trinhdo{
    public idTrinhdo:number;
    public tentrinhdo:number;
    public giatri:number;
}