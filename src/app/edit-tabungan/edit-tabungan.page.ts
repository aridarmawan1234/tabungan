import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatabaseService } from 'src/service/database.service';
import * as tools from 'src/app/tools.service';

@Component({
  selector: 'app-edit-tabungan',
  templateUrl: './edit-tabungan.page.html',
  styleUrls: ['./edit-tabungan.page.scss'],
})
export class EditTabunganPage {
  editTabungan: FormGroup;
  data:object;
  constructor(private NavParams: NavParams, private db: DatabaseService,
    private toastCtrl : ToastController, public formBuilder: FormBuilder, private modalCtrl: ModalController,private navCtrl: NavController, ) {
      this.editTabungan = formBuilder.group({
        tgl: ['', Validators.required],
        uang: ['', Validators.required],
        namaLengkap: ['', Validators.required],
        }); 
        this.editTabungan.get('uang').valueChanges.subscribe((value) => {
          this.patchFormValue('uang', value);
        });
    }
    patchFormValue(model: string, value: number) {
      this.editTabungan.get(model).patchValue(tools.thousandFormat(value), { emitEvent: false });
    }
  ionViewWillEnter() {
    this.data = {...this.NavParams.get('data')};
    console.log(this.data)
    setTimeout(()=>{
      this.editTabungan.setValue({
        namaLengkap: this.data['nama'],
        uang: tools.numberFormat(this.data['uang'],0),
        tgl: this.data['tanggal']
      })
      console.log(this.editTabungan.value.namaLengkap)
    },200);
  }
  
  dismiss(data?: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(data);
  }
  send(){
    let price = tools.thousandUnformat(this.editTabungan.value.uang);
    
    console.log(this.data['id'],
    this.editTabungan.value.namaLengkap,
    price,
    this.editTabungan.value.tgl)

    this.db.UpdateTabungan(
      this.data['id'],
      this.editTabungan.value.namaLengkap,
      price,
      this.editTabungan.value.tgl
    )
    setTimeout(()=>{this.dismiss()},200)
  }
}
