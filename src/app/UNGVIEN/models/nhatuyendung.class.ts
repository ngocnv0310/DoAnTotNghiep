import { today } from './Base.class';
export class Nhatuyendung{
    public idNhatuyendung: number;
    public email: string;
    public logo: string = "Resources/Images/company.jpg";
    public showlogo: string;
    public tencongty: string;
    public tenviettat: string;
    public linhvuchoatdong: string;
    public quymocongty: number;
    public diachi: string;
    public nganhnghehoatdong: number;
    public ngaydangky: string = today;
    public sdt: number;
    public website: string;
    public bannercongty: string;
    public videogioithieu: string;
    public hinhanh: string;
    public gioithieucongty: string;
    public matkhau: string;
    public douutien: number;
    public luotxem: number=0;
    public count = 0;
    public isdelete: boolean=false;
    public sociallogin: boolean=false;
}