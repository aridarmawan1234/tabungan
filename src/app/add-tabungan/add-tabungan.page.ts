import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { Storage } from '@ionic/storage';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { StorageAService } from 'src/app/storage-a.service';
import { DatabaseService } from 'src/service/database.service';
import * as messageCenter from 'src/app/message-center.service';
import * as tools from 'src/app/tools.service';
@Component({
  selector: 'app-add-tabungan',
  templateUrl: './add-tabungan.page.html',
  styleUrls: ['./add-tabungan.page.scss'],
})
export class AddTabunganPage {
  tabungan: FormGroup;
  uang = [];
  constructor(  public formBuilder: FormBuilder,private storage: StorageAService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private db: DatabaseService,
    private toastCtrl : ToastController
    ) {    
    this.tabungan = formBuilder.group({
    tgl: [this.currentDate(), Validators.required],
    uang: ['', Validators.required],
    nama: ['', Validators.required],
    }); 
    this.tabungan.get('uang').valueChanges.subscribe((value) => {
      this.patchFormValue('uang', value);
    });

  }
  patchFormValue(model: string, value: number) {
    this.tabungan.get(model).patchValue(tools.thousandFormat(value), { emitEvent: false });
  }

  ionViewWillEnter() {

    messageCenter.addRespone('addTabungan', async(obj)=>{
      console.log(obj)
        if(obj.toString() == 'Y'){
          let alert = await this.toastCtrl.create({
            message: 'Success insert to Database',
            duration : 3000,
            color: 'primary'
          });
          await alert.present();
        }else{
          let alert = await this.toastCtrl.create({
            message: 'Failed insert to Database',
            duration : 3000,
            color: 'danger'
          });
          await alert.present();
        }
    })
  }

  ionViewWillLeave() {
    messageCenter.delRespone('addTabungan');
  }

 async send(){
    let price = tools.thousandUnformat(this.tabungan.value.uang);
    this.db.CreateTabungan(
      this.tabungan.value.nama,
      price,
      this.tabungan.value.tgl
    )
  }

  currentDate() {
    var d = new Date();
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  dismiss(data?: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(data);
  }
}
