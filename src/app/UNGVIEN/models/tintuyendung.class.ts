import { Nganh } from './Base.class';


function GetFormattedDate() {
    var todayTime = new Date();
    var month = (todayTime .getMonth() + 1);
    var day = (todayTime .getDate());
    var year = (todayTime .getFullYear());
    var dd=day.toString();
    var MM=month.toString();
    if(month<10){
        MM = "0"+ month;
    }
    if(day<10){
        dd = "0"+ day;
    }
    return year +"-"+ MM +"-" + dd;
}

export class Tintuyendung {
    public idTintuyendung: number;
    public tieude: string;
    public chucdanh: string;
    public capbac: string = "Nhân viên";
    public soluong: string;
    public motacongviec: string;
    public yeucaukynang: string;
    public yeucaucongviec: string;
    public minluong: number;
    public maxluong: number;
    public thuongluong: boolean;
    public ngaydang: string = GetFormattedDate();
    // public ngaydang: string = ((new Date).getFullYear() +"-"+ (new Date).getMonth()+"-"+ (new Date).getDate()).toString();
    public ngayhethan: string;
    public gioitinh: string;
    public kinhnghiem: string;
    public tenthanhpho: string;
    public emaillienhe: string;
    public sdtlienhe: string;
    public nguoilienhe: string;
    public tencongty: string;
    public idNhatuyendung:number;
    public idLoaicongviec:number=0;
    public idDiadiemlamviec:number=0;
    public idDiadiemlamviecNavigation:Diadiemlamviec;
    public tennganh:string;
    public soluongungtuyen:number;
    public isdelete:boolean=false;
    public luotxem: number=0;
    public trangthai: string;

}

export class Diadiemlamviec{
    public idDiadiemlamviec:number;
    public idThanhpho:number;
    public idNhatuyendung:number;
    public diachi:string;
}