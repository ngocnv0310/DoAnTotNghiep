export const today = GetFormattedDate();

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




export class NgoaiNguBase{
    public idNgoaingu:number;
    public tenngoaingu:string;
}

export class Loc{
    public minluong:number;
    public loaicongviec:number;
    public capbac:string;
    public thanhpho:number;
    public nganhnghe:number
}

export class Loaicongviec{
    public idLoaicongviec:number;
    public tenloaicongviec:string;
}

export class Nganh{
    public idNganh:number;
    public tennganh:string;
}
export class Chuyenmon{
    public idChuyenmon:number;
    public idNganh:number;
    public tenchuyenmon:string;
}
export class Congviecmongmuon{
    public tenvieclam:string
    public idCongviecmongmuon;
    public idUngvien:number;
    public capbac:string = "Tất cả";
    public luong:Number;
    public noikhac:boolean =false;
    public thuongluong:boolean =false;
    public thongbao:string;
    public idThanhpho:number=0;
    public idNganh:number=0;
    public idLoaicongviec:number=0;
    public ngaytao:string = today;
}

export class Boloc{
    public idThanhpho:number=0;
    public capbac:string="Tất cả";
    public searchName:string="";
    public idNganh:number=0;
    public loaiCV:number=0;
    public luong:number = 0;
    public phucloi: Phucloi[];
}

export class Phucloi{
    public idPhucloi;
    public tenphucloi;
}


const xoa_dau = (str:string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}