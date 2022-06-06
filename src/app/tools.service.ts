//import * as global from '../service/global';

var setting_CharacterForDecimalSeparator = ".";
var setting_CharacterForThousandSeparator = ",";

export class tools{
  constructor(){

  }
}
export function thousandFormat(value) {
    let input = thousandUnformat(value);
    let formatted = input == '' ? '' : Number(input).toLocaleString();
    return formatted;
  }
    
export function thousandUnformat(val) {
    //check val apakah typeof adalah number, jika true langsung di return
    //kalo false manipulasi data dulu agar bersih
    if(typeof(val) !== 'number'){
        val = val.replace(/^0+/, '').replace(/\D/g,'');

        if (setting_CharacterForThousandSeparator === ',') {
            return val.replace(/,/g, '');
        } else {
            return val.replace(/\./g, '');
        }
    }
    return val;
  }
export function numberFormat(value, fixed)
{
  if(value=="Infinity") return "0";
    let result = "";
    if(fixed > -1)
        value = parseFloat(value).toFixed(fixed);
    let tmp = value.toString().split(".");
    let count =0;
    for(let i = tmp[0].length-1; i >=0;i--)
    {
        if(count>=3 && tmp[0].charAt(i).toString()!="-")
        {
            result = setting_CharacterForThousandSeparator + result;
            count=0;
        }
        result = tmp[0].charAt(i).toString() + result;
        count++;
    }
    if(tmp.length> 1)
        result += setting_CharacterForDecimalSeparator + tmp[1].toString();

    return result;
}
export function numberSignFormat(value, fixed)
{
  if(value=="Infinity") return "0";
    let result = "";
    if(fixed > -1)
        value = parseFloat(value).toFixed(fixed);
    let tmp = value.toString().split(".");
    let count =0;
    for(let i = tmp[0].length-1; i >=0;i--)
    {
        if(count>=3 && tmp[0].charAt(i).toString()!="-")
        {
            result = setting_CharacterForThousandSeparator + result;
            count=0;
        }
        result = tmp[0].charAt(i).toString() + result;
        count++;
    }
    if(tmp.length> 1)
        result += setting_CharacterForDecimalSeparator + tmp[1].toString();

    if(value==0) {}
    else if(value>0){ result = '+'+result}
    else if(value<0){}
    

    return result;
}
export function kmbtFormat(value, fixed)
{
    let result;
    let unit = "";
    let isMinus = false;
    if(value < 0) isMinus = true;
    value = Math.abs(value);
    if(value >= 1000000000000){
        result = (value / 1000000000000);
        unit = " T";
    }
    else if(value >= 1000000000){
        result = (value / 1000000000);
        unit = " B";
        }
    else if(value >= 1000000){
        result = (value / 1000000);
        unit = " M";
        }
    else if(value >= 1000){
        result = (value / 1000);
        unit = " K";
        }
    else {
        result = value;
        unit = "";
        if(isMinus) result=result*-1;

        let tmp = numberFormat(result, 0);
        return  tmp + unit;
    }
    if(isMinus) result=result*-1;

    let tmp = numberFormat(result, fixed);
    return  tmp + unit;
}export function dateStyle(date,style){
    date = date+'';
    let y = date.substr(0, 4);
    let m = date.substr(4, 2);
    let d = date.substr(6, 2);

    let mm = "";
    mm = mountName(m).substr(0,3);
    let mmm = "";
    mmm = mountShortName(m).substr(0,3);
    
    if(style==1){
        return d+" "+mm+" "+y;
    }
    else if(style==2){
        return d+"/"+m+"/"+y;
    }
    else if(style==3){
        y = y.substr(2,2);
        return d+"/"+m+"/"+y;
    }
    else if(style==4){ 
        return d+"-"+mmm+"-"+y;
    }
    else if(style==5){ 
        return d+" "+mmm+" "+y;
    }
}

export function mountName(value){
    let m = value;
    let mm = '';
    if(m=="01"){
        mm="January";
        }
    else if(m=="02"){
           mm="February";
    }
    else if(m=="03"){
       mm="March";
    }
    else if(m=="04"){
        mm="April";
    }
    else if(m=="05"){
        mm="May";
    }
    else if(m=="06"){
        mm="June";
    }
    else if(m=="07"){
        mm="July";
    }
    else if(m=="08"){
       mm="August";
    }
    else if(m=="09"){
        mm="September";
    }
    else if(m=="10"){
        mm="October";
    }
    else if(m=="11"){
        mm="November";
    }
    else if(m=="12"){
        mm="Desember";
    }
    return mm;
}
export function mountShortName(value){
    let m = value;
    let mm = '';
    if(m=="01"){
        mm="Jan";
        }
    else if(m=="02"){
           mm="Feb";
    }
    else if(m=="03"){
       mm="Mar";
    }
    else if(m=="04"){
        mm="Apr";
    }
    else if(m=="05"){
        mm="May";
    }
    else if(m=="06"){
        mm="Jun";
    }
    else if(m=="07"){
        mm="Jul";
    }
    else if(m=="08"){
       mm="Aug";
    }
    else if(m=="09"){
        mm="Sep";
    }
    else if(m=="10"){
        mm="Oct";
    }
    else if(m=="11"){
        mm="Nov";
    }
    else if(m=="12"){
        mm="Des";
    }
    return mm;
}
export function dateFormat(value,style)
{
    if (style == "dd-MMM-yyyy"){
  const date = value.toString();
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const d = new Date(year, month - 1, day);
        const n = d.toLocaleDateString('en-gb');
        return n;

      }
  if (style=="YYYY-mm-DD")  {
    let result = "";
    let temp = value;
    result = temp.toString().charAt(0)+
    temp.toString().charAt(1)+
    temp.toString().charAt(2)+
    temp.toString().charAt(3)+
    "-"+
    temp.toString().charAt(4)+
    temp.toString().charAt(5)+
    "-"+
    temp.toString().charAt(6)+
    temp.toString().charAt(7);
    return result;
  }
  else if (style=="DD-mm-YYYY-") {
    let result = "";
    let temp = value;
    result = temp.toString().charAt(8)+
    temp.toString().charAt(9)+
    "-"+
    temp.toString().charAt(5)+
    temp.toString().charAt(6)+
    "-"+
    temp.toString().charAt(0)+
    temp.toString().charAt(1)+
    temp.toString().charAt(2)+
    temp.toString().charAt(3);
    return result;
  }else if (style=="DD-mm-YYYY") {
    let result = "";
    let temp = value;
    result = temp.toString().charAt(6)+
    temp.toString().charAt(7)+
    "-"+
    temp.toString().charAt(4)+
    temp.toString().charAt(5)+
    "-"+
    temp.toString().charAt(0)+
    temp.toString().charAt(1)+
    temp.toString().charAt(2)+
    temp.toString().charAt(3);
    return result;
  }else if (style=="DD/mm/YYYY") {
    let result = "";
    let temp = value;
    result = temp.toString().charAt(6)+
    temp.toString().charAt(7)+
    "/"+
    temp.toString().charAt(4)+
    temp.toString().charAt(5)+
    "/"+
    temp.toString().charAt(0)+
    temp.toString().charAt(1)+
    temp.toString().charAt(2)+
    temp.toString().charAt(3);
    return result;
  }
  else if (style=="YYYYmmDD") {
        let result = "";
        let temp = value;
        result = temp.toString().charAt(0)+
            temp.toString().charAt(1)+
            temp.toString().charAt(2)+
            temp.toString().charAt(3)+
            temp.toString().charAt(5)+
            temp.toString().charAt(6)+
            temp.toString().charAt(8)+
            temp.toString().charAt(9);
		return result;
	}
	else if (style=="YYmD") {
		let result = "";
		let temp = value;
		result = temp.toString().charAt(0)+
			temp.toString().charAt(1)+
			temp.toString().charAt(2)+
			temp.toString().charAt(3)+
			temp.toString().charAt(4)+
			temp.toString().charAt(5)+
			temp.toString().charAt(6)+
			temp.toString().charAt(7);
	}
  return value;
}
export function timeFormat(value)
{
    if(value==0) return "00:00:00";
    let result = "";
    let temp = value+1000000;
    result = temp.toString().charAt(1)+temp.toString().charAt(2)+":"+
    temp.toString().charAt(3)+temp.toString().charAt(4)+":"+
    temp.toString().charAt(5)+temp.toString().charAt(6);
    return result;
}
export function currentDate() {

    let d = new Date();
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
export function minDate() {
    
    let d = new Date();
    d.setMonth(d.getMonth()-1);
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
export function maxDate() {
    
    let d = new Date();
    d.setMonth(d.getMonth()+1);
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    console.log([year, month, day])
    return [year, month, day].join('-');
}
export function currentDateModify(value) {
    let date = new Date();
    let d = new Date();
    if(value!=""){
      d = new Date(date.getTime() + value * 24 * 60 * 60 * 1000);
    }

    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
export function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}
export function getFromTime(value,style)
{
    if(value==0) return "00";
    var temp = value+1000000;
    if(style=="H") return temp.toString().charAt(1)+temp.toString().charAt(2);
    else if(style=="M") return temp.toString().charAt(3)+temp.toString().charAt(4);
    else if(style=="S") return temp.toString().charAt(5)+temp.toString().charAt(6);
    /*
    result = temp.toString().charAt(1)+temp.toString().charAt(2)+":"+
    temp.toString().charAt(3)+temp.toString().charAt(4)+":"+
    temp.toString().charAt(5)+temp.toString().charAt(6);
    return result;
    */
}
export function getFromDate(value,style)
{
    if(value==0) return "00";
    if(style=="Y") return value.toString().charAt(0)+value.toString().charAt(1)+value.toString().charAt(2)+value.toString().charAt(3);
    else if(style=="M") return value.toString().charAt(4)+value.toString().charAt(5);
    else if(style=="D") return value.toString().charAt(6)+value.toString().charAt(7);
    /*
    result = temp.toString().charAt(1)+temp.toString().charAt(2)+":"+
    temp.toString().charAt(3)+temp.toString().charAt(4)+":"+
    temp.toString().charAt(5)+temp.toString().charAt(6);
    return result;
    */
}
export function getBeforeDate(value) {
    let date = new Date();
    date.setDate(date.getDate()-value);

    let mmDateNow:any = date.getMonth()+1;        
    let fdate:any = date.getDate();

    if(fdate<10){
        fdate='0'+fdate;
    } 

    if(mmDateNow<10){
        mmDateNow='0'+mmDateNow;
    } 

    return date.getFullYear() + '' + mmDateNow + '' + fdate;
}