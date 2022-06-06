import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController, LoadingController, ModalController, AlertController } from '@ionic/angular';
import { AddTabunganPage } from 'src/app/add-tabungan/add-tabungan.page'
import { StorageAService } from 'src/app/storage-a.service';
import { DatabaseService } from 'src/service/database.service';
import * as messageCenter from 'src/app/message-center.service';
import * as tools from 'src/app/tools.service';
import { element } from 'protractor';
import { EditTabunganPage } from 'src/app/edit-tabungan/edit-tabungan.page';

@Component({
  selector: 'app-tab-tabungan',
  templateUrl: './tab-tabungan.page.html',
  styleUrls: ['./tab-tabungan.page.scss'],
})
export class TabTabunganPage{
    /**
   * @var NamaFilter = account yang sudah dipilih dari accountlist
   */
  listTabungan = [];
  total = 0;
  NamaFilter = "ALL";
  listTabunganArray = [];
  namaLengkap = []
  startDate = tools.currentDateModify(-8);
  endDate = tools.currentDateModify(21);
  checkedFilterAll = false;

  constructor(private modalCtrl: ModalController,public storage: StorageAService, private db: DatabaseService, private alertCtrl: AlertController) { }

  ionViewWillEnter() {
    this.requestDb() 
  }
  ionViewWillLeave() {
    messageCenter.delRespone('getSelectNama');

  }
  customActionSheetOptions: any = {
    header: 'ALL',
  };

 async openPage(){
    let modal = await this.modalCtrl.create({
      component: AddTabunganPage,
      componentProps: {
      }
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.requestDb()
  }

 requestDb(){
   let tempData = [];
   let data = [];
   this.listTabungan = [];
    this.db.dbState().subscribe((res)=>{
      if(res){
        this.total = 0;
        console.log(this.startDate, this.endDate)
        this.db.getSelectName(this.NamaFilter,this.startDate.toString(),this.endDate.toString()).then(res =>{
          console.log(res)
          data = Object.assign(res);
          for(let i=0; i<data.length; i++){
            data[i]['No'] = i + 1;
            data[i]['tanggalFormat'] = tools.dateStyle(data[i]['tanggal'].replace(/-/g, ""), 5);
            this.total += parseFloat(data[i]['uang']);
            tempData.push(data[i]['nama']);
          }
          this.listTabungan = Object.assign(data)
          this.listTabunganArray = Object.assign(data);
          this.namaLengkap = Array.from(new Set(tempData));

          this.namaLengkap.sort((a,b)=>a.localeCompare(b));
        })
      }
    });
 }

async EditData(data){
  let modal = await this.modalCtrl.create({
    component: EditTabunganPage,
    componentProps: {
      'data' : data
    }
  })
  await modal.present();
  const result = await modal.onWillDismiss();
   console.log(result)
 }

 Filter(nama?){
   this.total = 0;
   if(this.checkedFilterAll){
     this.NamaFilter = 'ALL';
   }
   const clone = Object.assign(this.listTabunganArray)
   this.listTabungan = []
   this.listTabungan = clone.filter(data =>{
    let expression = [];
    if (nama != "ALL") {
      expression[0] = data.nama == nama ;
      if(nama == data.nama){
        this.total += parseFloat(data.uang)
      }
    }else{
      expression[0] = true;
      this.total += parseFloat(data.uang)
    }

    return expression[0];
   })

 }

 getDate(){
  let d = new Date();
  let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month].join('-');
  }

 async delete(data){
    let alert = await this.alertCtrl.create({
      header: `Confirmation Delete`,
      buttons: [{
        text: "Send",
        handler: () => {
          console.log([

            ])
            this.db.deleteSong(data.id);
            this.requestDb();
        }
      }, {
        text: "Cancel",
        role: 'cancel'
      }]
    })
    await alert.present();
  }

}
